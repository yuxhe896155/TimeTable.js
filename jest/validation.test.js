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
});