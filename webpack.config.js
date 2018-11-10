let file = {};
file.full = "./TimeTable.js";                     //Library with Vuejs and Bulma(Non-minified)
file.fullMin = "./TimeTable.min.js";              //Library with Vuejs and Bulma(Minified)
file.vueMin = "./TimeTable_with_vue.min.js";      //Library with Vuejs, no Bulma(Minified)
file.bulmaMin = "./TimeTable_with_bulma.min.js";  //Library with Bulma, no Vuejs(Minified)
file.noneMin = "./TimeTable_simple.min.js";       //Simple Library(Minified)

let entry = {};
entry.entry = "./modules/app.js";

let resolve = {
    resolve: {
        alias: {
            vue: "vue/dist/vue.min.js",
            bulma: "bulma/css/bulma.min.css"
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
    entry: "./modules/app.js",
    mode: "development",
    output: {
        filename: "./TimeTable.js"
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.min.js",
            bulma: "bulma/css/bulma.min.css"
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