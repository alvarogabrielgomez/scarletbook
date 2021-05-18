module.exports = function getGtag(id, options) {
    return `<!-- Global site tag (gtag.js) - Google Analytics -->
    <script nonce='${options.data.root.nonce}' async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
    <script nonce='${options.data.root.nonce}'>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${id}');
    </script>`
}


// function tag(options, id) {
    
//     // return `<!-- Google Tag Manager -->
//     // <script nonce='${options.data.root.nonce}'>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//     // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//     // j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//     // 'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
//     // n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);
//     // })(window,document,'script','dataLayer','${gtmContainerID}');</script>
//     // <!-- End Google Tag Manager -->`;
// }

// function tagBody(options, gtmContainerID) {
//     return `<!-- Google Tag Manager (noscript) -->
//     <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmContainerID}"
//     height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
//     <!-- End Google Tag Manager (noscript) -->`;
// }


// module.exports = function getGTag(position, options) {
//     let response;
//     const gtmContainerID = 'GTM-55W865F';
//     switch(position) {
//         case 'head':
//             response = tagHead(options, gtmContainerID);
//             break;
//         case 'body':
//             response = tagBody(options, gtmContainerID);
//             break;
//         default:
//             break;
//     }

//     return response;
// }