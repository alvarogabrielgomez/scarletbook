const Articles = require('../models/articles.model');
const Categories = require('../models/categories.model');
const { createService } = require('../services/OpenGraphImage');
const openGraphService = createService();

class OpenGraphMiddleware {
    get path() {
        return '/:articleSlug/og.png';
    }

    
    get funcs() {
        return [
            async (req, res, next) => {
                try { 
                    const article = await Articles.get(req.params.articleSlug);
                    
                    const ogImageBuffer = await openGraphService.createCanvas(article);
                    res.set({'Content-Type': 'image/png'});
                    res.write(ogImageBuffer);
                    res.end();

                } catch (e){
                    next(e);
                }
            }
        ]
    }
}

module.exports = () => new OpenGraphMiddleware();