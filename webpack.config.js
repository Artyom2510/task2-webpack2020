const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all"
		}
	};

	if (isProd) {
		config.minimizer = [new TerserWebpackPlugin()];
	}
	return config;
};

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const babelOptions = () => {
	const opts = {
		presets: ["@babel/preset-env"]
	};

	return opts;
};

const jsLoaders = () => {
	const loaders = [
		{
			loader: "babel-loader",
			options: babelOptions()
		}
	];

	if (isDev) {
		loaders.push("eslint-loader");
	}

	return loaders;
};

module.exports = {
	context: resolve(__dirname, "src"),
	mode: "development",
	entry: {
		main: ["@babel/polyfill", "./js/index.js"]
	},
	output: {
		filename: filename("js"),
		path: resolve(__dirname, "build")
	},
	resolve: {
		extensions: [".js", ".json", ".png", ".jpg", ".svg"]
	},
	optimization: optimization(),
	devServer: {
		port: 3000,
		hot: isDev
	},
	devtool: isDev ? "source-map" : "",
	plugins: [
		new HtmlWebpackPlugin({
			template: "./pug/pages/index.pug",
			filename: "./index.html"
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: resolve(__dirname, "src/assets"),
					to: resolve(__dirname, "build")
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: filename("css")
		})
	],
	module: {
		rules: [
			// {
			// 	test: /\.css$/i,
			// 	exclude: /node_modules/,
			// 	use: [
			// 		{
			// 			loader: isProd ? MiniCssExtractPlugin.loader : "style-loader"
			// 		},
			// 		{
			// 			loader: "css-loader"
			// 		},
			// 		{
			// 			loader: 'postcss-loader',
			// 			options: {
			// 				postcssOptions: {
			// 					plugins: [
			// 						[
			// 							'postcss-preset-env',
			// 							{
			// 								// Options
			// 							},
			// 						],
			// 					],
			// 				},
			// 			},
			// 		},
			// 	]
			// },
			{
				test: /\.scss$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: isProd ? MiniCssExtractPlugin.loader : "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					}
				]
			},
			{
				test: /\.(png|jpe?g|svg)$/i,
				use: "file-loader"
			},
			// {
			// 	test: /\.svg$/i,
			// 	use: "svg-inline-loader"
			// },
			{
				test: /\.(ttf|eot)$/i,
				use: "file-loader"
			},
			{
				test: /\.pug$/i,
				use: "pug-loader"
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: jsLoaders()
			}
		]
	}
}