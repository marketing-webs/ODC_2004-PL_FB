const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/index.js",
		//policy: "./src/policy/index.js",
		summary: "./src/summary/index.js",
		"sw.loader": "./src/sw.loader.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif|ico|webm|mp4|webp)$/,
				loader: "file-loader",
				options: {
					outputPath: "images",
				},
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			// {
			//   test: /\.(eot|svg|ttf|woff|woff2|pdf)$/,
			//   use: [
			//     {
			//       loader: "file-loader?name=./fonts/[name].[ext]",
			//     },
			//   ],
			// },
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			chunks: ["index"],
			title: "KATOLICKI PORTAL MISYJNY",
			template: "./src/index.html",
			filename: "index.html",
		}),
		new HtmlWebPackPlugin({
			chunks: ["index"],
			title: "KATOLICKI PORTAL MISYJNY",
			template: "./src/summary/summary.html",
			filename: "summary.html",
		}),
		new HtmlWebPackPlugin({
		  chunks: ["index"],
		  title: "KATOLICKI PORTAL MISYJNY",
		  template: "./src/phone/phone.html",
		  filename: "phone.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
};
