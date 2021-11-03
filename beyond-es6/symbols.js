var sym = Symbol('This is first symbol');

console.log(sym);

console.log(typeof sym);

console.log(sym.toString());
console.log(sym.valueOf());
console.log(sym.description);

// register to global symbol registry

const INSTANCE = Symbol.for('instance.only');

var desc = Symbol.keyFor(INSTANCE); // this does not work if Symbol is not registered globally
console.log(desc);

// get the symbol from the registry again
var s2 = Symbol.for(desc);

console.log(s2 === INSTANCE);

// -----------------------------------------------------

var o = {
    foo: 42,
    [Symbol("bar")]: "hello world",
    baz: true
};

console.log(Object.getOwnPropertyNames(o));	// [ "foo","baz" ]
console.log(Object.getOwnPropertySymbols(o)); //  [ Symbol(bar) ]