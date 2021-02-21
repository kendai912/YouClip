const mix = require("laravel-mix");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
require("laravel-mix-bundle-analyzer");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js("resources/assets/js/app.js", "public/js")
  .vue()
  // .sass("resources/assets/sass/app.scss", "public/css")
  .webpackConfig({
    output: {
      chunkFilename: "[name].chunk.js",
      publicPath: "/",
    },
    plugins: [new VuetifyLoaderPlugin()],
  })
  .options({
    terser: {
      extractComments: false,
      terserOptions: {
        output: {
          comments: false,
        },
      },
    },
  })
  .version();

// if (!mix.inProduction()) {
//   mix.bundleAnalyzer();
// }
