let Vue = require("vue");

let member = 5;

let toDoubleDigits = ((num)=>{
    num += "";
    if (num.length === 1) {
        num = "0" + num;
    }
    return num;
});
let getTime = ((start = null)=>{
    let hour;
    let minute;
    if(!start){
        hour =   Math.floor(Math.random() * 24);
        minute = Math.floor(Math.random() * 60);
    }else{
        let compHour = start.substring(0,2);
        console.log(compHour);
    }
    hour = toDoubleDigits(hour);
    minute = toDoubleDigits(minute);
    let compHour = hour.substring(0,2);
    console.log(compHour);
    return `${hour}:${minute}`;
});
Vue.component("row12", {
    template: "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>7:45</td></tr>",
})
new Vue({
    el: "#app",
    data: {
        test: getTime(),
        test2: getTime(this.test),
        arr: ["aa","aa","aa"],
        show: true,
        showTempRow: false,
        hideTempRow: true,
    },
    methods:{
        addRow: function(){
            // Adding row and its animation
            this.showTempRow = (this.showTempRow)?false:true;
            this.hideTempRow = (this.hideTempRow)?false:true;
            if(this.arr.length%2){
                document.getElementById("tempRow").classList.add("evenRowColor");
            }
            setTimeout(()=>{
                this.arr.push("OK");
                this.showTempRow = (this.showTempRow)?false:true;
                this.hideTempRow = (this.hideTempRow)?false:true;
            }, 100);
            
        }
    }
});


