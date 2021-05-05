module.exports = function toLocaleDateString(string, locale, options) {
    const response =  new Date(string).toLocaleDateString(locale);
    return response;
}