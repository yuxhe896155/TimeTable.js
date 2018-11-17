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
Vue.component("row", {
    template: "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>7:45</td></tr>",
});
// Instance for table
new Vue({
    el: "#table",
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
            // Adding row and animation
            let time = 200;
            let toggle  = ()=>{
                this.showTempRow = (this.showTempRow)?false:true;
                this.hideTempRow = (this.hideTempRow)?false:true;
            };
            document.getElementById("tempRow").style.transitionDuration = `${time/1000}s`;
            toggle();
            if(this.arr.length%2){
                document.getElementById("tempRow").classList.add("evenRowColor");
            }
            setTimeout(()=>{
                this.arr.push("OK");
                toggle();
            }, time);
        }
    }
});

new Vue({
    el: "#card",
    data: {
        name: "JOHN",
        times: ["11:00-12:00", "12:00-12:15"],
        showTempCard: false,
        hideTempCard: true,
    },
    methods: {
        addRow: function(){
            // Adding row and animation
            let time = 200;
            let toggle  = ()=>{
                this.showTempCard = (this.showTempCard)?false:true;
                this.hideTempCard = (this.hideTempCard)?false:true;
            };
            document.getElementById("tempCard").style.transitionDuration = `${time/1000}s`;
            toggle();
            setTimeout(()=>{
                this.times.push("OK");
                toggle();
            }, time);
        }
    },
});

new Vue({
    el: "#overlay",
    data: {
        show: true,
    },
    methods: {
        toggle: function(){
            this.show = (this.show)?false:true;
        }
    }
});