const Article = require('../../models/article.model');
const BaseController = require('../base/baseController');

class BlogController extends BaseController {
    async show(req, res) {
        try {
            const article = new Article(
                'Test',
                'Description',
                './public/img/stock1.jpg',
                ['Test'],
                new Date().toLocaleDateString(),
                'Alvaro Gabriel',
                'Category Test',
                'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n',
            )
            article.slug = req.params.slug;
            return this.view(res, 'articles', article);
        } catch(e){
            return res.status(e.statusCode).send(e.message);
        }
    }

    edit(req, res) {
        return res.status(200).send('Not implemented');
    }
    
}

module.exports = BlogController;
