import path from 'path';
import webpack from 'webpack';
import commonElectronConfig from './webpack.electron.config';

const isDev = process.env.NODE_ENV === 'development';

const mainConfig: webpack.Configuration = {
    ...commonElectronConfig,
    mode: isDev ? 'development' : 'production',
    externals: ['fsevents'],
    target: 'electron-main',
    entry: { main: './electron/main/main.ts' },
    output: {
        path: path.resolve(__dirname, '../../dist/main'),
        filename: '[name].js',
    },
    plugins: [
        ...(commonElectronConfig.plugins || []),
    ].filter(Boolean),
};

export default mainConfig;
