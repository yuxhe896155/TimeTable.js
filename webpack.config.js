module.exports = {
    entry: "./src/app.js",
    mode: "development",
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