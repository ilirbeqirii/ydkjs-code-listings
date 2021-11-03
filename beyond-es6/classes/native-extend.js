class MyArray extends Array {
    first() { return this[0] }
    last() { return this[this.length - 1] }
}

var a = new MyArray(1, 2, 3);
console.log(a.first());
console.log(a.last());

class Oops extends Error {
    constructor(reason) {
        super(reason);

        this.oops = reason;
    }
}

var ouch = new Oops('I messed up!');
console.log(ouch);
throw ouch;
