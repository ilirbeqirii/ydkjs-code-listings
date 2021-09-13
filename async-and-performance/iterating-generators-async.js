function ajax(url, cb) {
    setTimeout(() => {
        if (url) {
            cb(null, 'Successfully Executed');
        } else {
            cb('Error thrown', 'Successfully Executed');
        }
    }, 1000);
}

function foo(x, y, cb) {
    ajax(
        "http://some.url.1/?x=" + x + "&y=" + y,
        cb
    );
}

foo(11, 31, function (err, text) {
    if (err) {
        console.log(err);
    } else {
        console.log(text);
    }
})

// ... above task flow control expressed with generators

function foo1(x, y) {
    ajax(
        "http://some.url.1/?x=" + x + "&y=" + y,
        function (err, text) {
            if (err) {
                it.throw(err); // throw error into main
            } else {
                it.next(text); // resume main() with received value
            }
        }
    );
}

function* main() {
    try {
        debugger;
        var text = yield foo1(11, 31);
        console.log(text);
    } catch (error) {
        console.error(error);
    }
}

var it = main();

// start all up
it.next(); // it.next(text) inside the foo1 fn resumes iterator execution after yield call

// ! We have totally synchronous-looking code inside the generator, but hidden behind the scenes, inside of foo1(..), operations can
// ! complete asyncronously.

// * This is a neayly perfect solution to our previously stated problem: that callbacks not being able to express asynchrony in 
// * a sequential, synchronous fashion that our brains can relate to.

// ! This also allows 'synchronous error handling' with try..catch, because of the 'yield' statement.

function foo2(x, y) {
    ajax(
        null,
        function (err, text) {
            if (err) {
                it.throw(err); // throw error into main
            } else {
                it.next(text); // resume main() with received value
            }
        }
    );
}

function* main2() {
    try {
        debugger;
        var text = yield foo2(11, 31);
        console.log(text);
    } catch (error) {
        console.error(error);
    }
}

var it2 = main2();
it2.next();