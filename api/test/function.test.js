const func = require('./function')

test(("2 plus 2 equals 4"), () => {
    expect(func.add(2, 2)).toBe(4)
})