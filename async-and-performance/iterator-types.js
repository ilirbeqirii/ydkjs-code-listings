// * Custom Iterator

var customIterator = (function () {
    var nextVal;

    return {
        next: function () {
            if (!nextVal) {
                nextVal = 1;
            } else {
                nextVal = nextVal * 2;
            }

            return { done: true, value: nextVal }
        }
    };
})();

console.log(customIterator.next().value); // 1
console.log(customIterator.next().value); // 2
console.log(customIterator.next().value); // 4

// ! this custom iterator is an iterator but not an iterable, for this reason it cannot be used on for...of loops

// for (const item of customIterator) {
//     console.log(item);
// }

// ! in this case an TypeError is thrown that 'customIterator' is not iterable.

// * Generator's iterator

function *generator() {
    var nextVal;

    while (true) {
        if (!nextVal) {
            nextVal = 1;
        } else {
            nextVal = nextVal * 2;
        }

        if (nextVal > 30) {
            break; // signals to the generator's iterator to terminate
        }

        yield nextVal;
    }
}

var iterator = generator();

console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 4

for (const item of iterator) {
    console.log(item); // logs all the items caue now, generator's iterator is also an iterable
}