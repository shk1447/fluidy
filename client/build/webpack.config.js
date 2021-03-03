var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
const vueLoaderConfig = require("./vue-loader.conf");
const utils = require("./utils");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var project_path = path.resolve(__dirname);
var root_path = path.resolve(__dirname, "../../bundle");
var build_path = path.resolve(root_path, "./client");

// var project_config = JSON.parse(fs.readFileSync(path.resolve(project_path , '../setup/index.json'), 'utf8'));
process.env.root_path = root_path;
var path_config = {
  production: {
    index: {
      path: "index.html",
    },
  },
  development: {
    index: {
      path: "index.html",
    },
  },
};
var copy_plugin_config = [{
  from:path.resolve(__dirname, '../src/static'),
  to:path.resolve(process.env.root_path, './static')
}];

var webpack_config = {
  watch: process.env.mode === "development",
  context: path.resolve(__dirname, "."),
  entry: {
    app:
      process.env.mode !== "development"
        ? ["babel-polyfill", "../src/main.ts"]
        : [
          "babel-polyfill",
          "webpack-hot-middleware/client?reload=true",
          "../src/main.ts",
        ],
  },
  output: {
    path: root_path,
    publicPath: "./",
    filename:
      process.env.mode === "development"
        ? "client/js/[name].js"
        : "client/js/[name].js",
    chunkFilename:
      process.env.mode === "development"
        ? "client/js/[id].js"
        : "client/js/[id].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts", ".css"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
        },
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "client/common/img/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "client/common/media/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "client/common/fonts/[name].[hash:7].[ext]",
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: path_config[process.env.mode].index.path,
      template: path.resolve(__dirname, "../index.ejs"),
      inject: true,
    }),
    new ExtractTextPlugin({
      filename: "client/common/css/[name].css",
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } },
    }),
    // copy custom static assets
    new CopyWebpackPlugin(copy_plugin_config),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, "../node_modules")
          ) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity,
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "app",
      async: "vendor-async",
      children: true,
      minChunks: 3,
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("../package.json").version),
      // MODE : JSON.stringify(process.env.mode)
    }),
  ],
};

if (process.env.mode === "development") {
  webpack_config["devtool"] = "eval-source-map";
} else {
  webpack_config.plugins.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }
  ));
}

module.exports = merge(webpack_config, {
  module: {
    rules: utils.styleLoaders({ sourceMap: true, usePostCSS: true }),
  },
});
