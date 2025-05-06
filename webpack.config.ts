import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { Configuration, DefinePlugin, WebpackPluginInstance } from 'webpack';
import 'webpack-dev-server';

import spawn from 'cross-spawn';

const port = 8081;
const isDev = process.env.NODE_ENV === 'development';
const publicPath = isDev ? '/' : './';

const rendererConfig: Configuration = {
    mode: isDev ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(js|jsx|ts|tsx|mjs)$/,
                exclude: [/node_modules/],

                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        configFile: true,
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
            {
                test: /\.(jpg|png|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]',
                },
            },
        ],
    },
    devtool: isDev ? 'eval-source-map' : 'hidden-source-map',
    name: 'Electron',
    target: 'web',
    entry: { renderer: './electron/renderer/renderer.ts' },
    output: {
        path: path.resolve(__dirname, './dist/renderer'),
        filename: '[name].js',
        publicPath,
    },
    externals: [],
    optimization: {
        splitChunks: false,
        minimize: !isDev,
        usedExports: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './electron/renderer/index.html'),
            path: path.resolve(__dirname, './dist'),
            minify: true,
            isBrowser: false,
            env: process.env.NODE_ENV,
        }),
        new DefinePlugin({
            'process.env': false,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
            __DEV__: JSON.stringify(isDev),
        }),
        isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    performance: {
        hints: false,
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        port,
        hot: true,
        host: 'localhost',
        historyApiFallback: true,
        compress: true,
        onListening: devServer => {
            if (process.env.START_ELECTRON) {
                if (!devServer) {
                    throw new Error('webpack-dev-server is not defined');
                }
                console.log('webpack-dev-server is listening');
                console.log('Attempting to run yarn electron...');
                const child = spawn('yarn', ['electron'], { stdio: 'inherit' });

                child.on('error', err => {
                    console.error(`Failed to start subprocess: ${err.message}`);
                });

                child.on('close', code => {
                    if (code !== 0) {
                        console.error(`Subprocess exited with code ${code}`);
                    }
                });
            }
        },
    },
    resolve: {
        alias: {
            'react-native$': 'react-native-web',
        },
        extensions: [
            '.web.ts',
            '.web.tsx',
            '.web.js',
            '.web.jsx',
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.json',
        ],
    },
    stats: 'minimal',
};

export default rendererConfig;
