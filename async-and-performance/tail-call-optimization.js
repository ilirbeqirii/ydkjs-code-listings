// * Briefly, a "tail call" is a function call that appears at the "tail" of another function, such that after the call finishes, there's nothing left to do
// * (except perhaps return its result value).

function foo(x) {
    return x;
}

function bar(y) {
    return foo(y + 1); // tail call
}

function baz() {
    return 1 + bar(40); // not tail call
}

baz(); // 42

// ? That sort of optimization isn't a big deal in a simple snippet, but it becomes a much bigger deal when dealing with recursion, especially if the recursion could 
// ? have resulted in hundreds or thousands of stack frames. With TCO the engine can perform all those calls with a single stack frame!

// Recursion is a hairy topic in JS because without TCO, engines have had to implement arbitrary (and different!) limits to how deep they will let the recursion stack 
// get before they stop it, to prevent running out of memory. With TCO, recursive functions with tail position calls can essentially run unbounded, because there's never any 
// extra usage of memory!

function factorial(n) {
    function fact(n, res) {
        if (n < 2) {
            return res;
        }

        return fact(n - 1, n * res);
    }

    return fact(n, 1);
}

factorial(5); // 120

// ! This version of factorial(..) is still recursive, but it's also optimizable with TCO, because both inner fact(..) calls are in tail position.

// * summary:
// Tail call optimization (TCO) is a required optimization as of ES6 that will make some recursive patterns practical in JS where they would have been impossible otherwise.
// TCO allows a function call in the tail position of another function to execute without needing any extra resources, which means the engine no longer needs to place arbitrary 
// restrictions on call stack depth for recursive algorithms.