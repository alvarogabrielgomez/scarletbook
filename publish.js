const articles = require('./system/core/server/models/articles.model');
const authors = require('./system/core/server/models/authors.model');
const categories = require('./system/core/server/models/categories.model');
const utilNode = require('util');
const packageJson = require('./package.json');
const exec = utilNode.promisify(require('child_process').exec);
const commander = require('commander');
const chalk = require('chalk');
const yesno = require('yesno');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const util = require('util');
const lineByLine = require('n-readlines');
const yamlFront = require('yaml-front-matter');
const hljs = require('highlight.js');
var dashify = require('dashify');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
        if(lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, {
                    language: lang
                }).value;
            } catch(e) {}
        }
        return ''; // use external default escaping
    }
  });

const program = new commander.Command(packageJson.name)
.version(packageJson.version);

let postPath;
let options = [];

const articlesPath = path.resolve(__dirname, '../../content');
const articleExt = 'md';
let database;

async function init() {
    console.clear();
    console.log('Publicando post...');
    console.log();
    console.log(chalk.red("Esto es un metodo temporal para publicar posts"));
    console.log();
    process.chdir(process.cwd());

    // program
    // .arguments('<post-path>')
    // .action(_postPath => {
    //     postPath = _postPath;
    //     console.log(`       ${chalk.cyan(postPath)}`);
    // });
    program
    .option('-f, --file <post-path>', 'post specific file')
    .parse(process.argv);
    options = program.opts();

    try {
        // Init Database
        console.log('📦 - Setting SQLite3 Database...');
        console.log();
        const databaseTools = require('./system/core/server/database/databaseTools')();
        database = await databaseTools.getDb();
    } catch (e) {
        console.error(e)
    }

    publish();
}

async function publish() {
    if (!options.file) {
        // All content/posts
        console.log(chalk.red("No fue especificado un archivo concreto, se usara la carpeta /content/posts/ y se publicara todo su contenido."));
        const ok = await yesno({
            question: 'Estas de acuerdo? y/n'
        });
        if (!ok) {
            console.log("Cancelado");
            process.exit(0);
        }
    }
    
    const postFile = path.resolve(__dirname, options.file);

    // Specific Post
    const file = await readArticle(postFile);

    const response = await articles.query().insert(
        {
            slug: dashify(path.basename(postFile, `.${articleExt}`)),
            title: file.title,
            description: file.description,
            heroImage: file.heroimage,
            tags: JSON.stringify(file.tags),
            authorId: file.authorId,
            categoryId: file.categoryId,
            content: file.__content
          }
    );

    console.log(`localhost:8080/${response.slug}`);

    process.exit(0);
}

function readFile(filePath, encoding = 'utf8') {
    return new Promise(async (resolve, reject) => {
        let fileData = '';
        await fs.access(filePath, fs.constants.F_OK, async (err) => {
            if (err) {
                resolve(fileData);
            } 
            fileData = await fsPromises.readFile(filePath, { encoding });
            resolve(fileData);
        });
    });
}

function parseMd(articleRaw) {
    let articleParsed = yamlFront.safeLoadFront(articleRaw)
    articleParsed.__content = md.render(articleParsed.__content);
    return articleParsed;
}

/**
*  Returns the metadata of the file from the Yaml Front Matter
*  @param {string} path         Path of article to read
*/
function readFrontArticle(path) {
    return new Promise(async(resolve, reject) => {
        try {
            // read line by line until find tags and stop.
            const liner = new lineByLine(path);
            let line;
            let readingYaml = false;
            let readed = '';
            while (line = liner.next()) {
                var lineString = line.toString('ascii') + '\n';
                if (lineString.includes('---')) {
                    readed += lineString;
                    if (readingYaml) {
                        liner.close();
                    }
                    readingYaml = readingYaml ? false : true;
                }
                if (readingYaml && !lineString.includes('---')) {
                    readed += lineString;
                }
            }
            const yamlParsed = parseMd(readed);
            console.log(yamlParsed);
            resolve(yamlParsed);

        } catch (e) {
            reject(e);
        }
    });
}

/**
*  Read the article file, and return its content parsed
*  @param {string} path         Path of article to read
*  @param {string} slug         Slug of page
*  @returns {object}            Returns an object loaded with the content
*/
function readArticle(path, slug) {
    return new Promise(async (resolve, reject) => {
        try {
            if (path) {
                const articleRaw = await readFile(path);
                // Parse Markdown and the metadata from yaml front
                let articleParsed = parseMd(articleRaw);
                // Load into articleParsed object the slug for SEO
                articleParsed.slug = slug;
                resolve(articleParsed);
            } else {
                reject({
                    statusCode: 404,
                    message: 'Page not found.'
                })
            }
            
        } catch (e){
            throw e;
        }
    })
}

function getPosts() {
    return new Promise(async (resolve, reject) => {
        let files = await fsPromises.readdir(articlesPath, { withFileTypes: true });
        files = files.filter(dirent => dirent.isFile() && path.extname(dirent.name) === `.${articleExt}`);
        resolve(files)
    });
}

init();