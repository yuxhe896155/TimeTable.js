let common = require("./common/common").default;
class msg{
    constructor(){
        console.log("OK");
    }
    log(a){
        return a + 1;
    }
}
exports.default = msg;