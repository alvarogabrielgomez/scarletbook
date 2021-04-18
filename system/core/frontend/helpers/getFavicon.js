module.exports = function getFavicon(path, options) {
    let linkTag = '';
    if (path.data.website.hasOwnProperty('favicon')) {
        linkTag = `<link rel="icon" type="image/png" href="${path.data.website.favicon}"/>`;
    } else {
        linkTag = `<link rel="icon" type="image/png" href="./favicon/favicon.ico"/>`;
    }
    return linkTag;
}