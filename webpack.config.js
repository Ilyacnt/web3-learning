const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /ethers\.min\.js$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        fallback: {
            os: require.resolve('os-browserify/browser'),
            stream: require.resolve('stream-browserify'),
            assert: require.resolve('assert/'),
            url: require.resolve('url/'),
            path: require.resolve('path-browserify'),
            crypto: require.resolve('crypto-browserify'),
        },
    },
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        port: 3000,
    },
}
