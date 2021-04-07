const BaseController = require('../base/baseController');
const Articles = require('../../models/articles.model');

class BlogController extends BaseController {
    async show(req, res) {
        try {
            // const article = new Article(
            //     'Test',
            //     'Description',
            //     './public/img/stock1.jpg',
            //     ['Test'],
            //     new Date().toLocaleDateString(),
            //     'Alvaro Gabriel',
            //     'Category Test',
            //     'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n',
            // )

            const query = await Articles.getPost(req.params.slug);
            console.log(query);
            if (query) {
                return this.view(res, 'articles', query);
            } else {
                return res.status(404).send('Post not found.');
            }

        } catch(e){
            return res.status(500).send(e.message);
        }
    }

    edit(req, res) {
        return res.status(200).send('Not implemented');
    }
    
}

module.exports = BlogController;
