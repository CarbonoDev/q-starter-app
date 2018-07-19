// Configuration for your app
var webpack = require('webpack')
var path = require('path')

// Get our env variables
const envparser = require('./config/envparser')

module.exports = function (ctx) {
  return {
    plugins: ['oauth', 'i18n', 'axios', 'events'],
    css: ['app.styl'],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons'
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: true,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      env: envparser(),
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
        // Aliases
        cfg.resolve.alias.env = path.resolve(__dirname, 'config/helpers/env.js')
        cfg.resolve.alias.services = path.resolve(__dirname, 'src/services')
        cfg.resolve.alias['@app'] = path.resolve(__dirname, 'src/app')
        cfg.resolve.alias.helpers = path.resolve(__dirname, 'src/app/helpers')
        cfg.resolve.alias['@events'] = path.resolve(__dirname, 'src/app/events')

        // Make our helper function Global
        cfg.plugins.push(
          new webpack.ProvidePlugin({
            'env': 'env' // this variable is our alias, it's not a string
          })
        )

        // Rules
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })

        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
      }
    },
    devServer: {
      // https: true,
      port: 3000,
      open: false // opens browser window automatically
    },
    // framework: 'all' --- includes everything for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide'
      ],
      directives: ['Ripple'],
      plugins: ['Notify', 'LocalStorage', 'SessionStorage', 'Cookies']
    },
    // animations: 'all' --- includes all animations
    animations: [],
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        name: 'Carbono App',
        short_name: 'Carbono-PWA',
        description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
          src: 'statics/icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: 'statics/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'statics/icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: 'statics/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: 'statics/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.0-beta.4'
  }
}
