// Use require in order to use in jest
const Validation = require("../modules/js/validation").default;
import "./css/main.css";

/**
 * First function to be called.
 * @method TimeTable
 * @param selector {string} id or class to set TimeTable[Necessary]
 * @param obj {obj} Setting of TimeTable[optional]
 * @return {object} Returns instance of TimeTable.<br>
 * If there was an error, returns undefined.
 */
window.TimeTable = (selector, obj = {})=>{
    let isCorrect = new Validation(selector, obj);
}

/**
 * @class
 */
class TimeTable{
    /**
     * OK
     */
    constructor(){
        console.log("loaded");
    }
}