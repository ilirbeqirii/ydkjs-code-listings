// https://dmitripavlutin.com/what-is-javascript-promise/

//... imperative and synchronous code

function getList() {
    return ['Joker', 'Batman'];
}

// run-to-completion behavior
function findPerson(who) {
    const list = getList(); // synchronous operation, but not always

    const found = list.some(person => person == who);

    console.log(found);
}

findPerson('Joker');

//---------------------------------------------------------------------

function getList() {
    setTimeout(() => ['Joker', 'Batman'], 1000)
}

function findPerson(who) {
    // const list = how to wait for this asyncronous/late result

    const found = list.some(person => person == who);

    console.log(found);
}

findPerson('Joker');

//-----------------------------------------------------------------------

// Callback approach

function getList(cb) {
    setTimeout(() => cb(['Joker', 'Batman']), 100);
}

function findPerson(who) {
    getList(
        list => {
            const found = list.some(person => person == who);
            console.log(found);
        }
    )
}

findPerson('Joker');

// Coding is more difficult cause flow of computation is hidden in between callbacks.
// Managing many async. operations with callbacks may quickly result in 'callback hell' problem.

// ---------------------------------------------------------------------

// How to code/write async operations/code while preserving the readability of synchronous code

// Idea of promises: encapsulate the asyncronicity and allow the function handling async operation to still look
// synchronous. Promises, wrapping the async operation result, can be returned synchronously from a function, assigned
// to variables or used as arguments.

// A promise is an object that encapsulates the result of an asynchronous operation. Each promise has its state, which be
// one of the following values: Pending, Fullfilled (with a value), Pending (for a reason)

function getList() {
    return new Promise(resolve => {
        setTimeout(() => resolve(['Joker', 'Batman']), 0);
    })
}

function findPerson(who) {
    let listPromise = getList(); // synchronous statement that returns a promise (even if behind it runs an async operation)

    listPromise
        .then(list => {
            const found = list.some(person => person == who);
            console.log(found);
        })
        .catch(error =>
            console.log(error)
        );
}

function findPerson(who) {
    let listPromise = getList(); // synchronous statement that returns a promise (even if behind it runs an async operation)

    listPromise
        .then(list => {
            const found = list.some(person => person == who);
            console.log(found);
        },
            err => console.log(err)
        );
}

findPerson('Joker');

// 1st benefit: manipulate async operation results in a sync way
// 2nd benefit: chaining

// Chain of Promises

// Promises are ojects that encapsulate the result of an async operation. Because it is an object, it can be used anyhow we want,
// return from function, uses as an argument, assign to variables etc. So this use case, this flexibility brought the first
// benefit: CHAIN OF PROMISES.

// The technical side of chaining consists of the fact that: promise.then() & promise.catch() methods by themselves return a 
// promise, to which you can attach '.then()' or '.catch()' methods and so on.

function delayDouble(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(number * 2), 1000);
    });
}

delayDouble(5)
    .then(res1 => {
        console.log(res1);

        return delayDouble(res1);
    })
    .then(res2 => {
        console.log(res2);

        return delayDouble(res2);
    })
    .then(res3 => {
        console.log(res3);
    })
    .catch(err => console.log(err));

// Async-Await
// Using promises still requires callbacks and relatively lots of boilerplate code like: then(), catch()
// async-await syntax is a syntactic sugar on top of the promises.
// Steps to apply async-await on top of the promises:
// 1. mark the functions that use promises with the 'async' keyword
// 2. inside async func. body, where you want to wait for a promise to resolve, use 'await promiseExpression' syntax
// 3. async function always returns a promise, which enables calling async functins inside async functions.

// when JS engine encounters 'await promise', where promise is in pending state, it's going to pause function execution 
// until 'promise' gets resolved (fullfilled or rejected).

function getList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['Joker', 'Batman'])
        }, 1000);
    });
}

async function findPerson(who) {
    try {
        const list = await getList(); // pause function execution until 'promise' gets resolved (fullfilled or rejected).

        const found = list.some(person => person == who);

        console.log(found);
    } catch (error) {
        console.log(error); // !If the promise rejects while being awaited
    }
}

findPerson('Joker');

// Now this version of findPerson with async-await is a lot similar with the synchronous findPerson version at the beginning.
// And this is the goal of promises and async-await syntax:
// 
//  *Being able to read/write an asynchronous piece of code, while still preserving the readability of synchronous code.

// await-ing chain

function doubleDelay(number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(number * 2);
        }, 1000);
    })
}

async function run() {
    const res1 = await doubleDelay(5);
    console.log(res1); // 10

    const res2 = await doubleDelay(res1);
    console.log(res2); // 20

    const res3 = await doubleDelay(res2);
    console.log(res3); // 40
}

run();