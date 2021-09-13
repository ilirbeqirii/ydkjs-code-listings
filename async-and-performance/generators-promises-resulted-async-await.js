// * The natural way to get the most out of Promises(trustable and composable) and generators(synchronous-looking async code) is to yield a Promise, and wire that Promise to control the generator's iterator.

function request(url) {
    return new Promise((resolve, reject) => setTimeout(() => {
        resolve('Resolved Successfully!')
    }, 1000));
}

function foo(x, y) {
    return request(
        "http://some.url.1/?x=" + x + "&y=" + y
    );
}

function* main() {
    try {
        var text = yield foo(11, 31);
        console.log(text);
    } catch (error) {
        console.log(error);
    }
}

debugger;
var it = main();

// returns the yielded promise
var p = it.next().value;

//  wait for the `p` promise to resolve
p.then(
    function (text) {
        it.next(text);
    },
    function (err) {
        it.throw(err);
    }
);

// ? ES7: async and await? : The proposal essentially codifies support for the pattern we've already derived, into a syntactic mechanism: 
// ? combining Promises with sync-looking flow control code. That's the best of both worlds combined, to effectively address practically all of the major concerns we outlined with callbacks.

async function main1() {
    try {
        var text = await foo(11, 31);
        console.log(text);
    } catch (error) {
        console.log(error);
    }
}

main1();

// ? The async function automatically knows what to do if you await a Promise -- it will pause the function (just like with generators) until the Promise resolves.

// ? it's just called as a normal function. Also, main() isn't declared as a generator function anymore; it's a new kind of function: async function.
    // ?  And finally, instead of yielding a Promise, we await for it to resolve.