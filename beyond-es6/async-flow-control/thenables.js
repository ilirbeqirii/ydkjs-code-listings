function ThenableFN() { }
ThenableFN.then = function (cb, err) {
    cb('Thenable Function!!');
};

Promise.resolve(ThenableFN).then(console.log);

var thenableObj = {
    then: function (cb, err) {
        err('Thenable Object Errored!!');
    }
}

Promise.resolve(thenableObj).then(console.log, console.log);

// * So a thenable can be a function or object that posses a function called then()

Promise.resolve((function () {
    return 'DOne returned value!!'
})()).then(console.log);


var p1 = Promise.resolve(41);
var p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(42), 100);
});
var p3 = 43;
var p4 = new Promise(function (resolve, reject) {
    setTimeout(() => reject('Oops'), 10);
});

Promise.all([
    p1,
    p2,
    p3,
    ThenableFN
]).then(console.log);

Promise.all([
    p1,
    p2,
    p3,
    p4
]).then(console.log, console.log);

Promise.all([
    p1,
    p2,
    p3,
    thenableObj
]).then(console.log, console.log);


console.log('');

Promise.race([p2, p1, p3])
    .then(function fulfilled(val) {
        console.log('race: ' + val);				// 41
    });

Promise.race([p1, p2, p3])
    .then(function fulfilled(val) {
        console.log('race: ' + val);				// 41
    });

Promise.race([p3, p2, p1])
    .then(function fulfilled(val) {
        console.log('race: ' + val);				// 41
    });

Promise.race([p2, p4])
    .then(
        function fulfilled(val) {
            console.log('race: ' + val);		
        },
        function rejected(reason) {
            console.log('race: ' + reason);		// Oops
        }
    );