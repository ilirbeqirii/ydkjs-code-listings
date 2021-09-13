// * Generator Delegation - calling a generator from another generator - using 'yield *' known as 'yield delegation'.

function* foo() {
    console.log("foo() starting");
    yield 3;
    yield 4;
    console.log("foo() finished");
}

function* bar() {
    yield 1;
    yield 2;
    yield* foo(); // 'yield'-delegation!
    yield 5;
}

var iterator = bar();

console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // foo() starting
// 3
console.log(iterator.next().value); // 4
console.log(iterator.next().value); // `*foo()` finished 
// 5
console.log(iterator.next().value); // undefined

// ? How does the yield *foo() delegation work?

// ? First, calling foo() creates an iterator exactly as we've already seen. Then, yield * delegates/transfers the iterator instance control (of the present *bar() generator) 
// ? over to this other *foo() iterator.

// ? So, the first two it.next() calls are controlling *bar(), but when we make the third it.next() call, now *foo() starts up, and now we're controlling *foo() instead of *bar(). 
// ? That's why it's called delegation -- *bar() delegated its iteration control to *foo().

// ? As soon as the it iterator control exhausts the entire *foo() iterator, it automatically returns to controlling *bar().

// * Note: yield * yields iteration control, not generator control; when you invoke the *foo() generator, you're now yield-delegating to its iterator. 
// * But you can actually yield-delegate to any iterable; yield *[1,2,3] would consume the default iterator for the [1,2,3] array value.
// ! yield * is a syntactic shortcut for manually iterating over the steps of *foo() while inside of *bar().

console.log('');
console.log('-------- Two-way message passing ---------');
// 'yield' - delegation: directed to another generator

function* foo1() {
    console.log("inside foo1(): ", yield 'B');

    console.log("inside foo1(): ", yield 'C');

    return 'D';
}

function* bar1() {
    console.log("inside bar1(): ", yield 'A');

    console.log("inside bar1(): ", yield* foo1());

    console.log("inside bar1(): ", yield 'E');

    return 'F';
}

var it2 = bar1();

console.log("outside: ", it2.next().value);
// outside: 'A'
console.log("outside: ", it2.next(1).value);
// inside bar1(): 1
// outside: 'B'
console.log("outside: ", it2.next(2).value);
// inside foo1(): 2
// outside: 'C'
console.log("outside: ", it2.next(3).value);
// inside foo1(): 3
// inside bar1(): 'D',
// outside: 'E' 
console.log("outside: ", it2.next(4).value);
// inside bar1(): '4',
// outside: 'F'


// --------------------------------------------------------------------------------------------------
console.log('');
// 'yield'-delegation not directed to another generator, but to a non-generator, ex: general iterable.

function *bar2() {
    console.log("inside bar(): ", yield 'A');

    // 'yield'-delegation to a non-generator
    console.log('inside bar(): ', yield * ['B', 'C', 'D']);

    console.log("inside bar(): ", yield 'E');

    return 'F';
}

var it3 = bar2();

console.log('outside: ', it3.next().value);
// outside: 'A'
console.log('outside: ', it3.next(1).value);
// inside bar(): 1
// outside: 'B'
console.log('outside: ', it3.next(2).value);
// outside: 'C'
console.log('outside: ', it3.next(3).value);
// outside: 'D'
console.log('outside: ', it3.next(4).value);
// inside bar(): undefined
// outside: 'E'
console.log('outside: ', it3.next(5).value);
// inside bar(): 5
// outside: 'F'

// ? Notice the differences in where the messages were received/reported between this example and the one previous.

// ? Most strikingly, the default array iterator doesn't care about any messages sent in via next(..) calls, so the values 2, 3, and 4 are essentially ignored. 
// ? Also, because that iterator has no explicit return value (unlike the previously used *foo()), the yield * expression gets an undefined when it finishes.