const BaseController = require('./base.controller');
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

    async showByTag(req, res) {
        try {
            const query = await Articles.getAllByTag(req.params.tag);
            if (query) {
                return this.view(res, 'tag', {tag: req.params.tag, query: query});
            } else {
                return res.status(404).send('Tags not found.');
            }
        } catch(e){
            return res.status(500).send(e.message);
        }
    }
    
}

module.exports = BlogController;
