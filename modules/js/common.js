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
};
exports.default = common;