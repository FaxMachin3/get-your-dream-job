const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#494ca2',
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
