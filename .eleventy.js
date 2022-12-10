const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight/src/markdownSyntaxHighlightOptions");

module.exports = function(eleventyConfig) {
    const configuredSyntaxHighlight = syntaxHighlight({})

    eleventyConfig.addMarkdownHighlighter((str, language) => {
        return configuredSyntaxHighlight(str, language || "text")
    })

    eleventyConfig.addPassthroughCopy("notes/**/*.png")
    eleventyConfig.addPassthroughCopy({
        "node_modules/prism-themes/themes/prism-vsc-dark-plus.css": "assets/css/prism-vsc-dark-plus.css",
    })
}
