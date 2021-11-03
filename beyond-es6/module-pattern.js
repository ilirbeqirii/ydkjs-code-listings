// * the old way of module pattern

function Hello(name) {
    function greeting() {
        console.log('Hello ' + name + "!");
    }

    // public API
    return {
        greeting: greeting
    };
}

var me = Hello('Kyle');
console.log(me.greeting());

// * sometimes, a module is called for as a singleton

var secondMe = (function Hello(name) {
    function greeting() {
        console.log('Hello ' + name + "!");
    }

    // public API
    return {
        greeting: greeting
    };
})('Kyle');

console.log(secondMe.greeting());


// * but now with ES6 we got ES6 Modules that have first class syntactic and functional support.















