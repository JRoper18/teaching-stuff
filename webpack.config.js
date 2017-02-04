/* global __dirname */
/* generated by unstuck-webpack */

var path = require('path');
var webpack = require('webpack');
var dir_js = path.resolve(__dirname, 'src');
var dir_build = path.resolve(__dirname, 'build');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = {
	entry: path.resolve(dir_js, 'index.js'),
	target: 'node',
	output: {
		path: dir_build,
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules', dir_js],
	},
	devServer: {
		contentBase: dir_build,
	},
	stats: {
		colors: true,
		chunkModules: false
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		})
	],

	module: {
		loaders: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "src"), 
				],
				presets: ['es2015', "react"]
			},
			{
				loader: 'file?name=/[name].html',
				test: /\.html$/
			}
		]
	}
};
