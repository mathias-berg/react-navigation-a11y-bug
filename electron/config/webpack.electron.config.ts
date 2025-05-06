import path from 'path';
import webpack, { WebpackPluginInstance } from 'webpack';

const isDev = process.env.NODE_ENV === 'development';

const electronConfig: webpack.Configuration = {
    module: {
        rules: [
            {
                test: /\.png$/,
                type: 'asset/inline',
            },
            {
                test: /\.(js|jsx|ts|tsx|mjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        configFile: true,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
    },
    stats: 'minimal',
    devtool: isDev ? 'eval-source-map' : 'hidden-source-map',
};

export default electronConfig;
