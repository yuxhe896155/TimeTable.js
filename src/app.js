import "./css/main.css";
import main from "./js/main";

window.TimeTable = function(obj){
    main(obj);
};
window.onload = function(){
    let a = new main({
        startTime: "10:00",
        endTime: "23:00",
        divTime: "15",
        shift:{
            "1": {
                "My Name":{
                    planWork: "10:00-15:00",
                    planRest: "12:00-13:00",
                    realWork: "11:00-16:00",
                    realRest: "13:00-14:00",
                }
            }
        }
    });
}