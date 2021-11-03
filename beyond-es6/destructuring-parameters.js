function foo([x, y]) {
    console.log(x, y);
}

foo([1, 2]);
foo([1]);
foo([]);


function bar({ a, b }) {
    console.log(a, b);
}

bar({ a: 1, b: 2 });
bar({ a: 1 });
bar({});

// ? Destructuring Defaults + Parameter Defaults

function f6({ x = 10 } = {}, { y } = { y: 10 }) {
    console.log(x, y);
}

f6();								// 10 10
f6( undefined, undefined );			// 10 10
f6( {}, undefined );				// 10 10

f6( {}, {} );						// 10 undefined
f6( undefined, {} );				// 10 undefined

f6( { x: 2 }, { y: 3 } );			// 2 3
