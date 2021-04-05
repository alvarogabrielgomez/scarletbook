module.exports = function (website) {
    const express = require('express');
    const BlogController = require('../../controllers/web/blog.controller');
    const blogController = new BlogController(website);
    const router = express.Router();

    router
        .get('/', (res, req) => blogController.index(res, req))
        .get('/:slug', (res, req) => blogController.article(res, req))
        // .post('/', blogController.create)
        // .get('/', blogController.getAll)
        // .get('/:item_id', blogController.getItem)
        // .delete('/:item_id', blogController.delete)
        // .put('/:item_id', blogController.update)

    return router;
}