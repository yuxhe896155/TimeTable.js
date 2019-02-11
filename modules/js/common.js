
let msg    = require("./msg").default;
/**
 * Common functions("new" is not required)
 * @class
 */
let common = {
    /**
     * Check data type
     * @memberof common
     * @param target {string|number|boolean|object} The value to check data type.
     * @param type {string} Expected data type.
     * @return {boolean} true: target data type and type are same. <br>
     * false: target data type and type are different.
     */
    checkDataType: (target, type)=>{
        let isOK = true;
        if(typeof type !== "string")isOK = false;
        if(typeof target !== type)isOK = false;
        return isOK;
    },
    /**
     * Show string in console
     * @memberof common
     * @param text {string} Text to show in console
     * @return {boolean} true
     */
    console: (text = "")=>{
        console.log(text);
        return true;
    },
    /**
     * Check parameter is time or not
     * @memberof common
     * @param time {string} Format should be (HH:SS)
     * @return {boolean} true
     */
    isTime: (time)=>{
        let isOK = true;
        try{
            if(!common.checkDataType(time, "string")){
                throw msg.common("checkDataType",{p1: time, p2: "string"});
            }
            if(!)
        }catch(e){
            common.console(`common -> isTime: ${e}`);
            isOK = false;
        }
        return isOK;
    },
};
exports.default = common;