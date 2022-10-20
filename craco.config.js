const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#6C63FF',
                            '@border-radius-base': '5px',
                            '@font-family': '"Montserrat", sans-serif',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
