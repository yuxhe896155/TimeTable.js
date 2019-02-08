let t = require("../modules/js/layout").default;
let ins = new t();
test('adds 1 + 2 to equal 3', () => {
    expect(ins.log(5)).toBe(6);
});