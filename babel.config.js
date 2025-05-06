const isDev = process.env.NODE_ENV !== 'production';

module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic',
                    importSource: 'react',
                    development: isDev,
                },
            ],
        ],
        plugins: ['react-native-web'],
    };
};
