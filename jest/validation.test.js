let v = require("../modules/js/validation").default;

describe("validation.checkSelector()", ()=>{
    test("Data type check", ()=>{
        let plan = [
            {param: 123,       expect: false},
            {param: true,      expect: false},
            {param: {val1:5},  expect: false},
            {param: [5],       expect: false},
        ];
        for(let val of plan){
            expect(v.checkSelector(val.param)).toBe(val.expect);
        }
    });
    test("First character check", ()=>{
        let plan = [
            {param: "target.",       expect: false},
            {param: "t.arget",       expect: false},
        ];
        for(let val of plan){
            expect(v.checkSelector(val.param)).toBe(val.expect);
        }
    });
    test("html existance check", ()=>{
        document.body.innerHTML = "<div class=\"prural\"><div class=\"prural\"></div></div>";
        let plan = [
            {param: "#target",      expect: false},
            {param: ".target",       expect: false},
            {param: ".prural",       expect: false},
        ];
        for(let val of plan){
            expect(v.checkSelector(val.param)).toBe(val.expect);
        }
    });
    test("Normal test", ()=>{
        document.body.innerHTML = "<div id=\"target\" class=\"target\"></div>";
        let plan = [
            {param: "#target",      expect: true},
            {param: ".target",       expect: true},
        ];
        for(let val of plan){
            expect(v.checkSelector(val.param)).toBe(val.expect);
        }
    });
});