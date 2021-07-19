const config = require('../../config');

class Website {
    constructor(website) {
        this.theme = website.theme || 'wanda',
        this.title = website.title || 'ScarletBook Blog';
        this.author = website.author || 'Accentio Studios';
        this.description = website.description || 'NodeJS + SQLite + Markdown blog system';
        this.type = website.type || 'website';
        this.url = website.url || null;
        this.canonical = website.canonical || this.url;
        this.image = website.image || null;
        this.imageAlt = website.imageAlt || null;
        this.favicon = website.favicon || './public/favicon.ico';
        this.twitterCard = website.twitterCard || 'summary_large_image';
        this.twitterSite = website.twitterSite || null;
        this.twitterCreator = website.twitterCreator || null;
        this.twitterImage = website.twitterImage || this.image;
        this.twitterDomain = website.twitterDomain || null;
    }

    set(website) {
        try {
            Object.keys(website).forEach(key => {
                this[key] = website[key];
            });
            return this;
        } catch(e) {
            throw e;
        }
    }
}

module.exports = Website;