const fs = require('fs');
const ora = require('ora');
const path = require('path');
const webpack = require('webpack');

var package = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json'), 'utf8'));
package.devDependencies = {};
package.dependencies = {
    "knex": "~0.21.1",
    "sqlite3": "^4.2.0",
    "mysql": "^2.18.1"
}
package.scripts = {
    "start": "export NODE_ENV=production && node --max-old-space-size=4096 ./backend.js"
}

const CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
    entry: './index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, '../bundle'),
        filename: './backend.js'
    },
    externals: {
        knex: 'commonjs knex',
        pg: 'commonjs pg'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './config.json'),
            to: path.resolve(__dirname, '../bundle/config.json')
        },{
            from: path.resolve(__dirname, './google.json'),
            to: path.resolve(__dirname, '../bundle/google.json')
        }]),
    ]
};
const spinner = ora('building for production...');
spinner.start();


webpack(config, (err, stats) => {
    fs.writeFileSync(path.resolve(__dirname, '../bundle/package.json'), JSON.stringify(package,null,2));
    spinner.stop();
});
