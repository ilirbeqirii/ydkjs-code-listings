// this is a stateful producer where each value has a definable relationship to the previous one.
console.log('---- Implementation using function closure ------');

var gimmeSomething = (function () {
    var nextVal;

    return function () {
        if (nextVal == undefined) {
            nextVal = 1;
        } else {
            nextVal = (3 * nextVal) + 6;
        }

        return nextVal;
    }
})();

console.log(gimmeSomething()); // 1
console.log(gimmeSomething()); // 9
console.log(gimmeSomething()); // 33
console.log(gimmeSomething()); // 105

// this task is a very common design pattern that is clearly resolved by iterators. 

// * An iterator is a well-defined interface for stepping through a series of values from a producer. As in most languages, JS interface for iterators, is to
// * call next() each time you want the next value from the producer.

console.log('---- Implementation using iterator ------');

var something = (function () { // ... (1)
    var nextVal;

    return {
        // needed for for..of loops
        [Symbol.iterator]: function () { console.log(this); return this; },

        // standard iterators interface method
        next: function () {
            if (nextVal === undefined) {
                nextVal = 1;
            } else {
                nextVal = (3 * nextVal) + 6;
            }

            return { done: false, value: nextVal };
        }
    };
})();

console.log(something.next().value); // 1
console.log(something.next().value); // 9
console.log(something.next().value); // 33
console.log(something.next().value); // 105

// iterators can be consumed by what are known as consumers in ES6 (the for..of loop native syntax)

console.log('Implementation: consume by using for..of loop construct');

for (const val of something) {
    console.log(val);

    if (val > 500) {
        break;
    }
} // 1, 9, 33, 105, 321, 969

// same implementation of something using generators

console.log('Implementation: using generator');

function* something() {
    var nextVal;

    while (true) {
        if (nextVal === undefined) {
            nextVal = 1;
        } else {
            nextVal = (3 * nextVal) + 6;
        }

        yield nextVal;
    }
}

for (const val of something()) { // we called the function not reference it
    console.log(val);
 } // 1, 9, 33, 105, 321, 969



// except with for..of loop we can consume iterator also manually
console.log('Manually using the iterator of the iterable');

var a = [1, 2, 3, 4, 5, 6];

var arrayIt = a[Symbol.iterator]();
