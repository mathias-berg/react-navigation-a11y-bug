import path from 'path';
import webpack, { WebpackPluginInstance } from 'webpack';
import commonElectronConfig from './webpack.electron.config';

const isDev = process.env.NODE_ENV === 'development';

const config: webpack.Configuration = {
    ...commonElectronConfig,
    mode: isDev ? 'development' : 'production',
    target: 'electron-preload',
    entry: { preload: './electron/preload/preload.ts' },
    output: {
        path: path.resolve(__dirname, '../../dist/preload'),
        filename: '[name].js',
    },
    plugins: [
        ...(commonElectronConfig.plugins || []),
    ].filter(Boolean),
};

export default config;
