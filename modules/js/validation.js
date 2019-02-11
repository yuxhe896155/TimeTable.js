let common = require("./common").default;
let msg    = require("./msg").default;
/**
 * Validates initial parameter set by library user.("new" is not required)
 * @class
 */
let validation = {
    /** 
     * Check whether selector has an error.
     * @memberof validation
     * @param selector {string} id or class to set TimeTable
     * @return {boolean}
     */
    checkSelector: (selector) =>{
        let isOK = true;
        let isId = true;
        try{
            if(!common.checkDataType(selector,"string")){
                throw msg.common("checkDataType",{p1: selector, p2: "string"});
            }
            // Check whether string is id or clas
            if(!(selector.substring(0,1) === "#" || selector.substring(0,1) === ".")){
                throw msg.validation("selectorFirst",{p1: selector});
            }else{
                isId = (selector.substring(0,1) === "#")? true: false;
            }
            // Check existance
            if(isId){
                if(!document.getElementById(selector.substring(1))){
                    throw msg.validation("noElement",{p1: selector});
                }
            }else{
                let el = document.getElementsByClassName(selector.substring(1));
                if(el.length === 0)throw msg.validation("noElement",{p1: selector});
                if(el.length > 1)throw msg.validation("moreElement",{p1: selector});
            }
        }catch(e){
            common.console(`validation -> checkSelector: ${e}`);
            isOK = false;
        }
        return isOK;
    },
    /** 
     * Check whether object has an error.
     * @memberof validation
     * @param obj {object} Setting of TimeTable
     * @return {boolean}
     */
    checkObject: (obj) =>{
        if(!validation.checkTime(obj))return false;

    },
    /** 
     * Check time.
     * @memberof validation
     * @param obj {object} Setting of TimeTable
     * @return {boolean}
     */
    checkTime: (obj)=>{
        let isOK = true;
        if(obj.startTime){
            let time = obj.startTime;
        } 
        return isOK;
    },
};
exports.default = validation;

validation.checkTime({});