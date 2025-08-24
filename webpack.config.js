const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        passes: 2,
                    },
                    mangle: {
                        toplevel: true,
                    },
                    output: {
                        comment: false,
                    },
                },
            }),
        ],
    },
};