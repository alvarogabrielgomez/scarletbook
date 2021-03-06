const moment = require("moment");
let pathFunction = require('path');

module.exports = function getArticleJsonLd(options) {

    const mainPath = options.data.root.hostUrl;

    let datePublished = moment(options.data.root.createdAt);
    datePublished = datePublished.format("YYYY-MM-DD")

    let dateModified = moment(options.data.root.updatedAt);
    dateModified = dateModified.format("YYYY-MM-DD")

    const jsonLd = {
        "@context": "https://schema.org",
        "@id": '#blogposting',
        "@type": "BlogPosting",
        "url": mainPath,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pathFunction.join(mainPath, '#webpage')
          },
        "headline":  options.data.root.title ? options.data.root.title : options.data.website.title,
        "image": [
            options.data.root.hasOwnProperty('heroImage') ? `${options.data.website.url}/${options.data.root.slug}/og.png` : '',
        ],

        "datePublished": datePublished,
        "dateCreated": datePublished,
        "dateModified": dateModified,
        "author": {
            "@type": "Person",
            "name": options.data.root.author
        },
        "editor": options.data.root.author,
        "genre": options.data.root.category, 
        "publisher": {
            "@type": options.data.website.publisher.type,
            "name": options.data.website.publisher.name,
            "logo": {
              "@type": "ImageObject",
              "url": pathFunction.join(mainPath, '/logos/sm_darkblue_rounded.png')
            }
          },
        "sameAs": options.data.website.publisher.sameAs,
        "parentOrganization":{
            "@id": '#organization',
            "@type": options.data.website.publisher.parentOrganization.type,
            "name": options.data.website.publisher.parentOrganization.name,
            "url": options.data.website.publisher.parentOrganization.url
         },
        "description": options.data.root.description
    };


    const scriptTag = `<script nonce='${options.data.root.nonce}' type="application/ld+json">
        ${JSON.stringify(jsonLd)} 
    </script>`.replace(/\r?\n|\r/g, "");

    return scriptTag;
}

