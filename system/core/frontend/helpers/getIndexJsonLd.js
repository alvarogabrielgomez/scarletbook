let pathFunction = require('path');

module.exports = function getIndexJsonLd(options) {

    const mainPath = options.data.root.hostUrl;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": '#organization',
        "url": mainPath,
        "name": options.data.website.title,
        "sameAs": options.data.website.publisher.sameAs,
        "logo": {
            "@type": "ImageObject",
            "@id": '#logo',
            "url": pathFunction.join(mainPath, '/logos/sm_darkblue_rounded.png')
        },
        "parentOrganization": {
            "@id": '#organization',
            "@type": options.data.website.publisher.parentOrganization.type,
            "name": options.data.website.publisher.parentOrganization.name,
            "url": options.data.website.publisher.parentOrganization.url
         },
    };


    const scriptTag = `<script nonce='${options.data.root.nonce}' type="application/ld+json">
        ${JSON.stringify(jsonLd)} 
    </script>`.replace(/\r?\n|\r/g, "");

    return scriptTag;
}

