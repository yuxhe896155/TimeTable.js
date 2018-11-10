import main from "./js/main";
import "./css/main.css";
require("bulma");
 
let Vue = require("vue");

console.log("OK");
new Vue({
    el: '#app',
    data: {
      test: "TEST"
    },
  });
let a = new main();