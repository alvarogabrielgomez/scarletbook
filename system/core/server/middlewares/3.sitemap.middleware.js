const express = require("express");
const router = express.Router();
const js2xmlparser = require("js2xmlparser");
const moment = require("moment");
const config = require('../../config/');
const Articles = require('../models/articles.model');
const Categories = require('../models/categories.model');

async function getLastMod() {
    let lastMod = await Articles.query()
    .select("updated_at")
    .orderBy('updated_at', 'desc')
    .limit(1);
    let date = moment(lastMod[0].updatedAt);
    return date = date.format("YYYY-MM-DD");
}

async function getCategories() {
    let all = await Categories.query()
    .orderBy('updated_at', 'desc');
}

async function getArticles() {
    let all = await Articles.query()
    .orderBy('updated_at', 'desc');

    let articles = [];

    all.forEach((a => {
        let date = moment(a.updatedAt);
        const article = {
            url: new URL(`/${encodeURIComponent(a.slug)}`, config.get('website:url')).href,
            description: a.description,
            featured_image_url: a.heroImage,
            updated_at: date.format("YYYY-MM-DD")
        }

        articles.push(article);
    }))

    return articles;
}

class SitemapMiddleware {
    get path() {
        return '/sitemap.xml';
    }

    get funcs() {
        return [
            async (req, res, next) => {
                try { 
                    // Get Articles and the last date of mod
                    const articles = await getArticles();
                    let lastmod = await getLastMod();
            
                    const collection = [];
                    const rootUrl = {};
            
                    // Root URL
                    rootUrl.loc = config.get('website:url');
                    rootUrl.lastmod = lastmod;
                    rootUrl.changefreq = "weekly";
                    rootUrl.priority = "1.0";
                    rootUrl["image:image"] = {
                        "image:loc": new URL(config.get('website:image').replace(".", ""), config.get('website:url')).href,
                        "image:caption": config.get('website:description'),
                    };
                    collection.push(rootUrl);
            
            
                    // Articles URL
                    for (let i = 0; i < articles.length; i++) {
                        const url = {};
                        url.loc = articles[i].url;
                        url.lastmod = articles[i].updated_at;
                        url["image:image"] = {
                            "image:loc": articles[i].featured_image_url,
                            "image:caption": articles[i].description,
                        };
             
                        collection.push(url);
                    }
            
            
                    // Final Wrapper
                    const col = {
                        "@": {
                            xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                            "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
                        },
                        url: collection,
                    };
            
                    // Return
            
                    const xml = js2xmlparser.parse("urlset", col);
                    res.set("Content-Type", "text/xml");
                    res.status(200);
                    res.send(xml);
            
                } catch (e) {
                    next(e);
                }
            }
        ]
    }
}

module.exports = () => new SitemapMiddleware();
