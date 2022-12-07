const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(syntaxHighlight)

    eleventyConfig.addPassthroughCopy("notes/**/*.png")
    eleventyConfig.addPassthroughCopy({
        "node_modules/prism-themes/themes/prism-vsc-dark-plus.css": "assets/css/prism-vsc-dark-plus.css",
    })
}
