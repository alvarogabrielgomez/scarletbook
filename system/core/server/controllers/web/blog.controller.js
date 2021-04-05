const Article = require('../../models/article.model');
const BaseController = require('../base/baseController');

class BlogController extends BaseController {
    async article(req, res) {
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
    
    }

module.exports = BlogController;
