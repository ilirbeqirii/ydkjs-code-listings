// let fooInstance = new Foo(); // ! ReferenceError: Cannot access 'Foo' before initialization - not hoisted

class Foo {

    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    gimmeAB() {
        return this.a * this.b;
    }
}

// ! Classes always use strict. All code inside the class construct is automatically in strict mode.
// ! Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods in the "prototype".

// Foo(); // ! TypeError: Class constructor Foo cannot be invoked without 'new'
// Foo.call({ a: 1, b: 3 }); // ! TypeError: Class constructor Foo cannot be invoked without 'new'
//.
//.
//.
// A function created by class is labelled by a special internal property [[IsClassConstructor]]: true. So it’s not entirely the same as creating it manually.
// The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with new:
