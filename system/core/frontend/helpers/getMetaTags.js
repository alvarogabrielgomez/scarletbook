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

function metaTagsTitle(path) {
    let tags = [];
    const metaAttributes = [{'property':'og:title'}, {'property':'og:site_name'}, {'name':'twitter:title'}];
    const content = path.data.root.title ? `${path.data.root.title}  | ${path.data.website.title}` : path.data.website.title;
    tags.push(`<title>${content}</title>`);
    tags.push(...addMultipleMetaTags(metaAttributes, content));
    return tags;
}


function metaTagsDesc(path) {
    let tags = [];
    const metaAttributes = [{'name':'description'}, {'property':'og:description'}, {'name':'twitter:description'}];
    const content = path.data.root.description ? path.data.root.description : path.data.website.description;
    tags.push(...addMultipleMetaTags(metaAttributes, content));
    return tags;
}

function metaTagsUrl(path) {
    let tags = [];
    const metaAttributes = [{'property':'og:url'}, {'name':'twitter:domain'}];
    const content = path.data.root.slug ? `${path.data.website.url}/${path.data.root.slug}` : path.data.website.url;
    tags.push(...addMultipleMetaTags(metaAttributes, content));
    return tags;
}

function metaTagsHeroImage(path) {
    let tags = [];

    if (path.data.root.hasOwnProperty('hero_image')) {
        tags.push(metaTag({
            attribute: 'property', data: 'og:image',
            content: path.data.root.hero_image
        }));
        
        tags.push(metaTag({
            attribute: 'property', data: 'og:image:alt',
            content: path.data.root.hero_image ? path.data.root.description : path.data.website.description
        }));
        
        tags.push(metaTag({
            attribute: 'name', data: 'twitter:image:src',
            content: path.data.root.hero_image
        }));
    }
        
    return tags;
}

function metaTagsTwitterCard(path) {
    let tags = [];

    if (path.data.website.hasOwnProperty('twitterCard')) {
        tags.push(metaTag({
            attribute: 'name', data: 'twitter:card',
            content: path.data.website.twitterCard
        }));
    }
    if (path.data.website.hasOwnProperty('twitterSite')) {
        tags.push(metaTag({
            attribute: 'name', data: 'twitter:site',
            content: path.data.website.twitterSite
        }));
    }
    if (path.data.website.hasOwnProperty('twitterSite')) {
        tags.push(metaTag({
            attribute: 'name', data: 'twitter:creator',
            content: path.data.website.twitterCreator
        }));
    }

    return tags;
}

module.exports = function getMetaTags(path, options) {
    let linkMetaTagsList = [];

    // Meta Title Tags
    linkMetaTagsList.push(...metaTagsTitle(path));

    // Meta Desc Tags
    linkMetaTagsList.push(...metaTagsDesc(path));

    // Url
    linkMetaTagsList.push(...metaTagsUrl(path));

    // Hero Image
    linkMetaTagsList.push(...metaTagsHeroImage(path));

    // Twitter Card
    linkMetaTagsList.push(...metaTagsTwitterCard(path));

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
        href: path.data.root.hasOwnProperty('content') ? `${path.data.website.url}/${path.data.root.slug}` : path.data.website.url
    }));

    // Favicon 
    linkMetaTagsList.push(linktag({
        rel: 'icon',
        type: 'image/png',
        href: path.data.website.hasOwnProperty('favicon') ? path.data.website.favicon : `./favicon/favicon.ico`
    }));


    return linkMetaTagsList.join(' ');
}