var p1 = new Promise(function (resolve, reject) {
    resolve(42);
});

var p2 = Promise.resolve(42); // p1 behaves identically as p2


// if u pass a genuine promise, it returns the same promise back
var promise = Promise.resolve(45);

var promise2 = Promise.resolve(promise);

console.log(promise == promise2);

// pass thenable 

var thenable = {
    then(rsFn, errFn) {
        rsFn(5);
        errFn('Error');
    }
}

thenable.then(
    function (value) {
        console.log(value);
    },
    function (err) {
        console.log(err);
    }
); // both cb are called - this is not default behavior of promises

Promise.resolve(thenable) // you get e genuine promise from a thenable object
    .then(
        function (value) {
            console.log('Success called with value: ' + value);
        },
        function (err) {
            console.log('Reject called with reason: ' + err);
        }
    )

// same as above 

var genuineThenablePromise = new Promise((resolve, reject) => {
    resolve(thenable);
});

genuineThenablePromise
    .then(
        function (value) {
            console.log('Success called with value: ' + value);
        },
        function (err) {
            console.log('Reject called with reason: ' + err);
        }
    )

var thenable1 = {
    then(rsFn, errFn) {
        errFn('Error');
    }
}

var genuineThenablePromise1 = new Promise((resolve, reject) => {
    resolve(thenable1);
});

genuineThenablePromise1
    .then(
        function (value) {
            console.log('Success called with value: ' + value);
        },
        function (err) {
            console.log('Reject called with reason: ' + err);
        }
    )