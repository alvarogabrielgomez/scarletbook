module.exports = function () {

    const config = require('../../../config');
    const apiVersion = config.get('api:version');
    const express = require('express');
    const PostsApiController = require(`../../controllers/api/${apiVersion}/posts.api.controller`);
    const postsApiController = new PostsApiController();
    const router = express.Router();

    // Idea: hacer un pipeline que procese todo el request antes de mandar hacia el controlador
    // Stages
    // shared.pipeline()

    router
        .get('/getLastEachCategory', (req, res) => postsApiController.getLastEachCategory(req, res))
        .get('/getLastThree', (req, res) => postsApiController.getLastThree(req, res))
        .get('/articles', (req, res) => postsApiController.getArticles(req, res))

    return router;
}