let common = require("./common/common").default;
class layout{
    constructor(){
        console.log("OK");
    }
    log(a){
        return a + 1;
    }
}
exports.default = layout;