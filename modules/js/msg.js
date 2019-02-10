/**
 * Messages uses in TimeTable.js("new" is not required)
 * @class
 * @exmaple msg.common("checkDataType", {p1: "aa", p2:"bb"}); //aa IS NOT bb
 */
let msg = {
    /**
     * Message of common.js
     * @memberof msg
     * @param text {string} The place make error occurs.
     * @param param {object} Text dynamically changes.
     * @return {string} Message
     */
    common: (text,param)=>{
        msg = {
            checkDataType: `${param.p1} IS NOT ${param.p2}`,
        };
        return msg[text];
    },
    /**
     * Message of validation.js
     * @memberof msg
     * @param text {string} The place make error occurs or key
     * @param param {object} Text dynamically changes.
     * @return {string} Message
     */
    validation: (text,param)=>{
        msg = {
            selectorFirst: `[${param.p1}] FIRST CHARACTER HAS TOBE # or .`,
            noElement:     `[${param.p1}] DOES NOT EXIST`,
            moreElement:   `[${param.p1}] EXIST MORE THAN 1`,
        };
        return msg[text];
    },

};
exports.default = msg;