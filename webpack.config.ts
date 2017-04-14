const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = {
	context: path.resolve( __dirname, './src' ),
	entry: {
  		devServer: 'webpack-dev-server/client?http://0.0.0.0:3000',
		hot: 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		app: './index.tsx'
	},
	devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.ts[x]?$/,
				enforce: 'pre',
				use: [
					{
						loader: 'tslint-loader',
					}
				]
			},
			{
				test: /\.ts[x]?$/,
				use: [
					{
						loader: 'react-hot-loader'
					},
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
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.LoaderOptionsPlugin({
	        options: {
	            tslint: {
	                emitErrors: true,
	                failOnHint: true,
	                exclude: /(node_modules)/
	            }
	        }
	    }),
	],
	devServer: {
		contentBase: path.resolve( __dirname, './dist' ),
		inline: true,
		hot: true,
		stats: 'errors-only',
		historyApiFallback: true,
		port: 3000
	},
	node: {
		fs: 'empty'
	}
};