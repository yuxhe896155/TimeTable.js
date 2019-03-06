module.exports = {
    entry: "./src/app.js",
    mode: "development",
    devtool: 'source-map',
    output: {
        filename: "./TimeTable.js"
    },
    module: {
        rules: [{
            test: /\.css/,
            use: [
                "style-loader",
                "css-loader",
            ],
        }]
    }
};