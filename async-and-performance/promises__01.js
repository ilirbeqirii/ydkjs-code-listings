var fullfilledThenable = {
    then: function (fulfill) {
        fulfill(5);
    }
}

var rejectedTHenable = {
    then: function (fullfill, reject) {
        reject('Ooops!');
    }
}

console.log(Promise.resolve(fullfilledThenable));
// console.log(Promise.resolve(rejectedTHenable));