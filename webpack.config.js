module.exports = {
    entry: "./modules/app.js",
    mode: "development",
    output: {
        filename: "./TimeTable.js"
    },
    module: {
        rules: [{
            test: /\.css/,
            use: [
                "style-loader",
                {loader: "css-loader", options: {url: false}},
            ],
        }]
    }
};