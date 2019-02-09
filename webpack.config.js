let file = {};
file.vueMin = "./TimeTable_with_vue.min.js";      //Library with Vuejs, no Bulma(Minified)
file.noneMin = "./TimeTable_simple.min.js";       //Simple Library(Minified)

let entry = {};
entry.entry = "./modules/TimeTable.js";

let resolve = {
    resolve: {
        alias: {
            vue: "vue/dist/vue.min.js",
        }
    }
};
let modules = {
    module: {
        rules: [{
            test: /\.css/,
            use: ["style-loader", "css-loader",],
        }]
    }
};

module.exports = {
    entry: "./modules/TimeTable.js",
    mode: "development",
    output: {
        filename: "./TimeTable.js"
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.min.js",
        },
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