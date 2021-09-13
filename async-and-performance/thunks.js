// In other words, you wrap a function definition around function call -- with any parameters it needs -- to defer the execution of that call, and that wrapping function is a
// thunk. When you later execute the thunk, you end up calling the original function.

console.log('---- Synchronous Thunk ----');

function foo(x, y) {
    return x + y;
}

function fooThunk() {
    return foo(3, 4);
}

// later

console.log(fooThunk()); // 7

console.log('----- Asynchronous Thunk -----');

function foo1(x, y, cb) {
    setTimeout(() => {
        cb(x + y);
    }, 1000);
}

function fooThunk1(cb) {
    return foo1(3, 4, cb);
}

// later
fooThunk1(function (data) {
    console.log(data);          // 7
});

// -----------------------------------------------------------
function thunkify(fn) { // creates thunks directly
    debugger;
    var args = [].slice.call(arguments, 1);

    return function (cb) {
        args.push(cb);

        return fn.apply(null, args);
    }
}

var fooThunk2 = thunkify(foo1, 3, 4);

// later
fooThunk2(function (data) {
    console.log('----- Asynchronoys Thunk Utility - Thunkify -----');

    console.log(data);
});

// ----------------------------------------------------------
function thunkify1(fn) {
    return function () {
        var args = [].slice.call(arguments);
        return function (cb) {
            args.push(cb);
            return fn.apply(null, args);
        }
    }
}

var fooThunkory = thunkify1(foo1, 3, 4); // thunk + factory => thunkory, creates thunk factory that creates thunks

var fooThunk3 = fooThunkory(3, 4);

// later

fooThunk3(function (data) {
    console.log(data);
});