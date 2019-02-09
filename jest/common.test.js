let c = require("../modules/js/common").default;

describe("common.dataCheck()", ()=>{
    let val1 = [1234,     "1234",    true,     [1234], {val:12}];
    let val2 = ["number", "string", "boolean", "object"        ];
    let plan = [
        {val1: val1[0], val2: val2[0],   expect: true },
        {val1: val1[1], val2: val2[0],   expect: false},
        {val1: val1[2], val2: val2[0],   expect: false},
        {val1: val1[3], val2: val2[0],   expect: false},
        {val1: val1[4], val2: val2[0],   expect: false},
        {val1: val1[0], val2: val2[1],   expect: false},
        {val1: val1[1], val2: val2[1],   expect: true },
        {val1: val1[2], val2: val2[1],   expect: false},
        {val1: val1[3], val2: val2[1],   expect: false},
        {val1: val1[4], val2: val2[1],   expect: false},
        {val1: val1[0], val2: val2[2],   expect: false},
        {val1: val1[1], val2: val2[2],   expect: false},
        {val1: val1[2], val2: val2[2],   expect: true },
        {val1: val1[3], val2: val2[2],   expect: false},
        {val1: val1[4], val2: val2[2],   expect: false},
        {val1: val1[0], val2: val2[3],   expect: false},
        {val1: val1[1], val2: val2[3],   expect: false},
        {val1: val1[2], val2: val2[3],   expect: false},
        {val1: val1[3], val2: val2[3],   expect: true },
        {val1: val1[4], val2: val2[3],   expect: true },
        {val1: val1[4], val2: null,      expect: false},
        {val1: val1[4], val2: undefined, expect: false},
        {val1: val1[4], val2: 0,         expect: false},
    ];
    for(let v of plan){
        test(`Param1 : ${v.val1},Param2: ${v.val2} expect ${v.expect}`, ()=>{
            expect(c.checkDataType(v.val1,v.val2)).toBe(v.expect);
        });
    }
});
describe("common.console()", ()=>{
    test("Set any text", ()=>{
        expect(c.console(2)).toBeTruthy();
        expect(c.console()).toBeTruthy();
    });
});