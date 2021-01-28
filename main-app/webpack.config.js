const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
				test: /\.(woff(2)?|ttf|ttc|otf|eot|png|jpg|gif|svg|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {},
					},
				],
			},
        ]
    },
    devtool: 'source-map',
    plugins: [
        new ModuleFederationPlugin({
            name: "test-react-app",
            remotes: {
                images_remote: "images_remote@http://localhost:3002/remoteEntry.js",
                videos_remote: "videos_remote@http://localhost:3003/remoteEntry.js"
            },
            shared: ['react', 'react-dom']
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}
