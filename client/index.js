'use strict';

const cmd = require('commander');
cmd.option('-p, --port [port]', 'set port', '4200')
  .option('-h, --host [host]', 'set proxy host', 'http://127.0.0.1:80')
  .option('-r, --reload [reload]', 'hot reload option', 'true')
  .option('-m, --mode [mode]', 'set mode', 'development')
  .parse(process.argv);

process.env.NODE_ENV = 'production';
process.env.port = cmd.port;
process.env.host = cmd.host;
process.env.reload = cmd.reload;
process.env.mode = cmd.mode;
process.env.dcim = cmd.dcim;

const webpack = require('webpack');

if (process.env.mode === "development") {
  const express = require('express');
  const http = require('http');
  const proxy = require('express-http-proxy');
  const httpProxy = require('http-proxy');
  const apiProxy = httpProxy.createProxyServer();
  const webpackConfig = require('./build/webpack.config.js');
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require("webpack-hot-middleware");

  let app = express();

  app.use('/', webpackDevMiddleware(compiler, {
    hot: true,
    inline: true,
    historyApiFallback: true,
    stats: {
      colors: true
    },
    publicPath: '/',
    overlay: true
  }));

  if (process.env.reload) {
    app.use('/', webpackHotMiddleware(compiler));
  }

  if (process.env.host) app.use('/', proxy(process.env.host));

  let server = http.createServer(app);
  server.listen(process.env.port, function () {
    console.log('Server listening on ' + process.env.port + ', Ctrl+C to stop');
  }).on('error', function (err) {
    console.log(err.message);
  });

  server.on('upgrade', function (req, socket, head) {
    apiProxy.ws(req, socket, head, { target: cmd.host });
  });
} else {
  const path = require('path');
  const rm = require('rimraf');
  const ora = require('ora');
  const chalk = require('chalk');

  const spinner = ora('building for production...');
  spinner.start();

  let client_path = path.resolve(__dirname, './bundle');
  rm(client_path, err => {
    webpack(require('./build/webpack.config.js'), (err, stats) => {
      if (err) throw err;
      spinner.stop();
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      if (stats.hasErrors()) {
        console.log('Build Failed With Errors! \n');
        process.exit(1);
      }

      console.log(chalk.cyan('  Build complete.\n'));
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    });
  })
}