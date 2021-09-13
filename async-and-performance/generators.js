function *generator() {
    return 5 * 6;
}

var genIterator = generator();
genIterator.next();
genIterator.value; // returns what is returned from the generator with 'return' keyword;

function generator2() {
    yield 5;
}

var genIterator2 = generator();
genIterator2.next().value; // returns what yield keyword sends out;
genIterator2.next().value; // returns undefined value cause nothing is returned with 'return' keyword

// Generators are new type of functions that does not behave with the run-to-completion behavior.

let x = 1;

function* foo() {
    x++;
    yield;      // ..... (1)
    console.log(x);
}

function bar() {
    x++;
}

let it = foo();

console.log(it.next());
console.log(x);
bar();
console.log(x)
console.log(it.next());

// Even though generators are special functions with new processing model - they are still functions, so they still accept arguments(inputs) and that it can still return
// a value (output)

console.log('');

function* foo1(x, y) {
    return x * y;
}

var it1 = foo1(5, 6);
console.log('returned result: ', it1.next());

// yield cause a value to be sent out from the generator during the middle of the execution, kind of like an intermediate return.
// ex: yield; returns undefined
//     yield 5; returns 5


// I/O messaging capability built  into generators, via "yield" and "next()":
console.log('');

function* foo2(x) {
    var y = x * (yield); // one yield expression - requests the calling code to provide a value for it
    return y;
}

var it2 = foo2(6);
console.log(it2.next()); // starts the generator until at first yield expression
let res = it2.next(7); // pass the value back to be that result of the paused yield expression.
console.log(res); // two next() method calls one yield expression.

// multiple iterators - iterator does not control the generator function itself. Each time you construct an iterator, you are implicitly constructing 
// a new instance of generator which that iterator will control
console.log('');

function* multiple() {
    let x = yield 2;
    z++;
    let y = yield (x * z);
    console.log(x, y, z);
}

let z = 1;

var iter_1 = multiple();
var iter_2 = multiple();

var val_1 = iter_1.next().value; // 2
var val_2 = iter_2.next().value; // 2 cause it yields the value 2 outside of generator

val_1 = iter_1.next(val_2 * 10); // x: 20, z:2 -> 20*2 = 40
val_2 = iter_2.next(val_1 * 5); // x: 200, z: 3 -> 200*3 = 600

iter_1.next(val_2 / 2); // y: 300, x: 20, z: 3
iter_2.next(val_1 / 4); // y: 10; x: 200; z: 3;

// intervleaving is possible with generators - breaking run-to-completion behavior
console.log('--------- Generators Interleaving -------------');

function step(gen) {
    var it = gen();
    var last;

    return function () {
        // what ever is yielded out, just send it right back in the "next" time.
        last = it.next(last).value;
    }
}

var a = 1;
var b = 2;

function* foo_5() {
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
}

function* bar_5() {
    b--;
    yield;
    a = (yield 3) + b;
    b = a * (yield 2);
}

var s1 = step(foo_5);
var s2 = step(bar_5);

s1();
console.log(a, b);
s1();
console.log(a, b);
s1();
console.log(a, b);

s2();
console.log(a, b);
s2();
console.log(a, b);
s2();
console.log(a, b);
s2();
console.log(a, b);