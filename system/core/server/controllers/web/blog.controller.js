const BaseController = require('./baseController');
const Articles = require('../../models/articles.model');

class BlogController extends BaseController {

    async show(req, res) {
        try {
            const query = await Articles.get(req.params.slug);
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
