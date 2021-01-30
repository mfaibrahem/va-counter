const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	entry: ["./src/index.js", "./src/styles/main.scss"],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "./public/dist")
	},
	module: {
		rules: [
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: "eslint-loader"
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: "babel-loader",
				options: {
					presets: ["react", "stage-0", "es2015"],
					plugins: ["transform-class-properties", "transform-decorators-legacy"]
				}
			},
			{
				test: /\.(png|jp(e*)g|svg|otf|woff|woff2|ttf|eot)$/,
				use: {
					loader: "file-loader"
					// options: {
					// 	limit: 100000
					// }
				}
			}
		]
	},
	devServer: {
		contentBase: "./public/",
		watchContentBase: true
	},
	devtool: "source-map",
	plugins: [
		new ExtractTextPlugin("bundle.css"),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
	]
};
