function request(url) {
    return new Promise((resolve, reject) => setTimeout(() => {
        resolve('Resolved Successfully!')
    }, 1000));
}

var res = [];

function* reqData(url) {
    res.push(
        yield request(url)
    );
}
debugger;
var it1 = reqData('test url 1');
var it2 = reqData('test url 2');

var p1 = it1.next().value;
var p2 = it2.next().value;

p1.then(function (data) {
    it1.next(data);

    return p2;
}).then(function (data) {
    it2.next(data + '1');

    console.log(res);
});


// But frankly, this is awfully manual, and it doesn't really let the generators orchestrate themselves, which is where the true power can lie. Let's try it a different way:

var res1 = [];

function* reqData1(url) {
    var data = yield request(url); // take 'data' throught it.next(data) method

    // transfer of control
    yield;

    res1.push(data);
}

var it3 = reqData1('test');
var it4 = reqData1('test11');

var p3 = it3.next().value;
var p4 = it4.next().value;


p3.then(function (data) {
    it3.next(data);
});

p4.then(function (data) {
    it4.next(data + '2');
});

Promise.all([p3, p4])
    .then(function () {
        it3.next();
        it4.next();

        console.log(res1);
    });

// In the previous snippet, the second instance was not given its data until after the first instance was totally finished. But here, both instances receive their data as soon 
// as their respective responses come back, and then each instance does another yield for control transfer purposes. We then choose what order to resume them in the 
// Promise.all([ .. ]) handler.