import "./css/main.css";
import main from "./js/main";

window.TimeTable = function(obj){
    main(obj);
};
window.onload = function(){
    let a = main({
        startTime: "10:00",
        endTime: "22:00",
        divTime: "15",
        shift:{
            "12": {
                name: "MARK",
                planWork: "10:00-15:00",
                planRest: "12:00-13:00",
                realWork: "11:00-16:00",
                realRest: "13:00-14:00",
                },
            "4": {
                name: "JOHN",
                planWork: "09:00-18:00",
                planRest: "13:00-14:00",
                realWork: "09:00-18:00",
                realRest: "14:00-15:15",
                },
            "8": {
                name: "JOB",
                planWork: "11:00-18:00",
                planRest: "13:00-14:00",
                realWork: "09:00-18:00",
                realRest: "14:00-15:15",
                },
                
            "10": {
                name: "NOJOBMAN",
                planWork: "",
                planRest: "",
                realWork: "",
                realRest: "",
                },
        }
    });
}