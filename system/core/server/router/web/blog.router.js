module.exports = function (website, database) {
    const express = require('express');
    const BlogController = require('../../controllers/web/blog.controller');
    const blogController = new BlogController(website, database);
    const router = express.Router();

    // Idea: hacer un pipeline que procese todo el request antes de mandar hacia el controlador
    // Stages
    // shared.pipeline()

    router
        .get('/', (res, req) => blogController.index(res, req))
        .get('/:slug', (res, req) => blogController.show(res, req))
        .get('/:slug/edit', (res, req) => blogController.edit(res, req))
        // .post('/', blogController.create)
        // .get('/', blogController.getAll)
        // .get('/:item_id', blogController.getItem)
        // .delete('/:item_id', blogController.delete)
        // .put('/:item_id', blogController.update)

    return router;
}