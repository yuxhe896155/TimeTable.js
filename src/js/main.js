import common from "./common"

export default function(obj){
    if($("#timetable").length === 0){
        console.log(`Parameter ${selector} is not found.`);
        return false;
    };
    let startTime = obj.startTime;
    let endTime = obj.endTime;
    let divTime = obj.divTime;
    let shift = obj.shift;
    

}