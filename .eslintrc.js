module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "globals": {
        "TimeTable": true,
        "describe": false,
        "test": false,
        "expect": false,
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console"      : ["error", { allow: ["warn", "error"] }],
        "indent"          : ["error",4],
        "linebreak-style" : ["error","windows"],
        "quotes"          : ["error","double"],
        "semi"            : ["error","always"],
        "no-useless-rename": ["error", {
            "ignoreDestructuring": true,
            "ignoreImport": true,
            "ignoreExport": true
        }]
    }
};
