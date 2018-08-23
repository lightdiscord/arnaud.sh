const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')

const chainWebpack = config => {
    return config.module.rule('md')
        .test(/\.md$/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
        .use('vue-markdown-loader')
        .loader('vue-markdown-loader/lib/markdown-compiler')
        .options({ raw: true })
}

const manifest = new WebpackPwaManifest({
    name: 'Arnaud.sh',
    short_name: 'Arnaud.sh',
    description: 'Home sweet home of LightDiscord',
    background_color: '#000000',
    theme_color: '#202124',
    icons: [
        {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512]
        }
    ]
})

module.exports = {
    chainWebpack,
    configureWebpack: {
        plugins: [ manifest ]
    }
}
