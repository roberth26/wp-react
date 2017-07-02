const path = require( 'path' );
const webpack = require( 'webpack' );
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
	context: path.resolve( __dirname, './src' ),
	entry: {
		app: './index.tsx'
	},
	devtool: 'cheap-module-source-map',
	// devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.ts[x]?$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
					}
				],
				include: path.join( __dirname, 'src' )
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		],
	},
	resolve: {
		extensions: [
			'.ts',
			'.tsx',
			'.js',
			'.jsx'
		],
		modules: [
			path.resolve( __dirname, './src' ),
			'node_modules'
		]
	},
	output: {
		path: path.resolve( __dirname, './dist' ),
		filename: '[name].bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify( 'production' )
			}
		}),
		new BabiliPlugin()
	]
};