function metaTag(meta) {
    const metaTag = `<meta ${meta.attribute}="${meta.data}" content="${meta.content}">`;
    return metaTag;
}

function linktag(link) {
    if (link.hasOwnProperty('type')) {
        return `<link rel="${link.rel}" type="${link.type}" href="${link.href}">`;
    }
    return `<link rel="${link.rel}" href="${link.href}">`;
}

function addMultipleMetaTags(metaAttributes, content) {
    let tags = [];
    metaAttributes.forEach((atr) => {
        tags.push(metaTag({
            attribute: Object.keys(atr)[0], data: atr[Object.keys(atr)[0]],
            content
        }));
    })
    return tags;
}

function metaTagsTitle(title) {
    let tags = [];
    const metaAttributes = [{'property':'og:title'}, {'property':'og:site_name'}, {'name':'twitter:title'}];
    tags.push(`<title>${title}</title>`);
    tags.push(...addMultipleMetaTags(metaAttributes, title));
    return tags;
}


function metaTagsDesc(desc) {
    let tags = [];
    const metaAttributes = [{'name':'description'}, {'property':'og:description'}, {'name':'twitter:description'}];
    tags.push(...addMultipleMetaTags(metaAttributes, desc));
    return tags;
}

function metaTagsUrl(url) {
    let tags = [];
    const metaAttributes = [{'property':'og:url'}, {'name':'twitter:domain'}];
    tags.push(...addMultipleMetaTags(metaAttributes, url));
    return tags;
}

function metaTagsHeroImage(heroImage, description) {
    let tags = [];
        tags.push(metaTag({
            attribute: 'property', data: 'og:image',
            content: heroImage
        }));
        
        tags.push(metaTag({
            attribute: 'property', data: 'og:image:alt',
            content: description
        }));
        
        tags.push(metaTag({
            attribute: 'name', data: 'twitter:image:src',
            content: heroImage
        }));
    return tags;
}

function metaTagsTwitterCard(options) {
    let tags = [];

    if (options.data.website.hasOwnProperty('twitterCard')) {
        tags.push(metaTag({
            attribute: 'name', data: 'twitter:card',
            content: options.data.website.twitterCard
        }));
    }
    if (options.data.website.hasOwnProperty('twitterSite')) {
        tags.push(metaTag({
            attribute: 'name', data: 'twitter:site',
            content: options.data.website.twitterSite
        }));
    }
    if (options.data.website.hasOwnProperty('twitterSite')) {
        tags.push(metaTag({
            attribute: 'name', data: 'twitter:creator',
            content: options.data.website.twitterCreator
        }));
    }

    return tags;
}

function getMetaTagsForArticles(options) {
    let linkMetaTagsList = [];
    // Meta Title Tags
    linkMetaTagsList.push(...metaTagsTitle(`${options.data.root.title}  | ${options.data.website.title}`));

    // Meta Desc Tags
    linkMetaTagsList.push(...metaTagsDesc(options.data.root.description));
    
    // Url
    linkMetaTagsList.push(...metaTagsUrl(`${options.data.website.url}/${options.data.root.slug}`));
    
    // Hero Image
    linkMetaTagsList.push(...metaTagsHeroImage(options.data.root.heroImage, options.data.root.description));
    
    // Twitter Card
    linkMetaTagsList.push(...metaTagsTwitterCard(options));
    
    // Robots
    linkMetaTagsList.push(metaTag({
        attribute: 'property', data: 'og:type',
        content: 'website'
    }));
    
    // Type
    linkMetaTagsList.push(metaTag({
        attribute: 'name', data: 'robots',
        content: 'index, follow'
    }));
    
    // Author
    if(options.data.root.author) {
        linkMetaTagsList.push(metaTag({
            attribute: 'name', data: 'author',
            content: options.data.root.author
        }));
    }
    
    // Canonical
    linkMetaTagsList.push(linktag({
        rel: 'canonical',
        href: `${options.data.website.url}/${options.data.root.slug}`
    }));
    
    // Favicon 
    linkMetaTagsList.push(linktag({
        rel: 'icon',
        type: 'image/png',
        href: options.data.website.hasOwnProperty('favicon') ? options.data.website.favicon : `/favicon/favicon.ico`
    }));

    return linkMetaTagsList.join(' ');
}

function getMetaTagsIndex(options) {
    let linkMetaTagsList = [];
    // Meta Title Tags
    linkMetaTagsList.push(...metaTagsTitle(options.data.website.title));

    // Meta Desc Tags
    linkMetaTagsList.push(...metaTagsDesc(options.data.website.description));
    
    // Url
    linkMetaTagsList.push(...metaTagsUrl(options.data.website.url));
    
    // Hero Image
    linkMetaTagsList.push(...metaTagsHeroImage('/logos/sm_darkblue_rounded.png', options.data.website.description));
    
    // Twitter Card
    linkMetaTagsList.push(...metaTagsTwitterCard(options));
    
    // Robots
    linkMetaTagsList.push(metaTag({
        attribute: 'property', data: 'og:type',
        content: 'website'
    }));
    
    // Type
    linkMetaTagsList.push(metaTag({
        attribute: 'name', data: 'robots',
        content: 'index, follow'
    }));
    
    // Canonical
    linkMetaTagsList.push(linktag({
        rel: 'canonical',
        href: options.data.website.url
    }));
    
    // Favicon 
    linkMetaTagsList.push(linktag({
        rel: 'icon',
        type: 'image/png',
        href: options.data.website.hasOwnProperty('favicon') ? options.data.website.favicon : `/favicon/favicon.ico`
    }));

    return linkMetaTagsList.join(' ');
}

function getMetaTagsDefault(options) {
    let linkMetaTagsList = [];
    // Hero Image
    linkMetaTagsList.push(...metaTagsHeroImage('/logos/sm_darkblue_rounded.png', options.data.website.description));
    
    // Twitter Card
    linkMetaTagsList.push(...metaTagsTwitterCard(options));
    
    // Robots
    linkMetaTagsList.push(metaTag({
        attribute: 'property', data: 'og:type',
        content: 'website'
    }));
    
    // Type
    linkMetaTagsList.push(metaTag({
        attribute: 'name', data: 'robots',
        content: 'index, follow'
    }));
    // Favicon 
    linkMetaTagsList.push(linktag({
        rel: 'icon',
        type: 'image/png',
        href: options.data.website.hasOwnProperty('favicon') ? options.data.website.favicon : `/favicon/favicon.ico`
    }));

    return linkMetaTagsList.join(' ');
}

module.exports = function getMetaTags(type, options) {
    if(options) {
        switch(type) {
            case 'articles':
                return getMetaTagsForArticles(options);
            case 'index':
                return getMetaTagsIndex(options);
            default:
                return getMetaTagsDefault(options);
        }
    }
    return getMetaTagsDefault(arguments[0]);
}