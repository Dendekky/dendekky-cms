const withSass = require("@zeit/next-sass")
const withPurgeCss = require("next-purgecss")

module.exports = withSass(withPurgeCss())
const withImages = require("next-images")

module.exports = withImages()

// config to host on netlify
// module.exports = {
//   // Target must be serverless
//   target: 'serverless'
// };
// const withCss = require('@zeit/next-css')
// module.exports = withCss({});
