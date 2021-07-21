let pathFunction = require('path');

module.exports = function getIndexJsonLd(options) {

    const mainPath = options.data.root.hostUrl;

    const jsonLd = {
        "@context": "https://schema.org",
        "@id": pathFunction.join(mainPath, '#organization'),
        "@type": "Organization",
        "name": options.data.website.title,
        "url": mainPath,
        "sameAs": options.data.website.publisher.sameAs,
        "parentOrganization":{
            "@type": options.data.website.publisher.parentOrganization.type,
            "name": options.data.website.publisher.parentOrganization.name,
            "@id": pathFunction.join(options.data.website.publisher.parentOrganization.url, '#organization'),
            "url": options.data.website.publisher.parentOrganization.url
         },
    };


    const scriptTag = `<script nonce='${options.data.root.nonce}' type="application/ld+json">
        ${JSON.stringify(jsonLd)} 
    </script>`.replace(/\r?\n|\r/g, "");

    return scriptTag;
}

