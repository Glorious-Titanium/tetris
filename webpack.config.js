/**
 * Created by diki on 05/08/16.
 */
var path = require('path');
var webpack = require('webpack');

/*
    loaders are arranged according to NODE_ENV
 */
var loaders = [
    // babel loader should exist anyway
    {
        loader: 'babel',
        test: /\.js$/,
        exclude: /node_modules/,
        // include: [path.resolve(__dirname, 'src', 'js')],
        query: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'react']
        }
    }
];

loaders.push({
    loader: 'style!css',
    test: /\.css$/,
});


/*
    plugins are also arranged according to NODE_ENV
 */

var plugins = [];

/*
    again in PRODUCTION put ExtractTextPlugin
    else put plugins for hot reloading
 */
if(process.env.NODE_ENV === 'PRODUCTION') {
    plugins.push(new ExtractTextPlugin("css/main.css"));
} else {
    plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}

module.exports = {
    entry: ['babel-polyfill', './src/js/main.js'],
    devtool: 'source-map',
    info: true,
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        loaders: loaders
    },
    plugins: plugins
};
