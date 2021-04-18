module.exports = function () {

    const express = require('express');
    const BlogController = require('../../controllers/web/blog.controller');
    const blogController = new BlogController();
    const router = express.Router();

    // Idea: hacer un pipeline que procese todo el request antes de mandar hacia el controlador
    // Stages
    // shared.pipeline()

    router
        .get('/', (req, res) => blogController.index(req, res))
        .get('/:slug', (req, res) => blogController.show(req, res))
        .get('/:slug/edit', (req, res) => blogController.edit(req, res))
        // .post('/', blogController.create)
        // .get('/', blogController.getAll)
        // .get('/:item_id', blogController.getItem)
        // .delete('/:item_id', blogController.delete)
        // .put('/:item_id', blogController.update)

    return router;
}