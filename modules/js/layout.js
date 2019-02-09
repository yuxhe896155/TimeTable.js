let common = require("./common/common").default;
exports.default = class{
    constructor(){
        console.log("OK");
        let ret = common.toDoubleDigits(5);
        console.log(ret);
    }
    log(a){
        return a + 1;
    }
};