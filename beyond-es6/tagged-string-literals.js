function foo(strings, ...values) {
    console.log(strings);
    console.log(values);

    return `${strings[0]}${values[0]}${strings[1]}`;
}

var desc = 'awesome';

var text = foo`Everything is ${desc}!`;
console.log(text);

// ? foo is a special kind of function call that doesn't need the (..). It is used as a tag for that specific interpolated/template string literal.

// * 1st argument - is an array of all the plain strings (the stuff between any interpolated expressions)
// * 2nd argument - are the results of the already-evaluated interpolation expressions found in the string literal

// ! Note: 
// ? A tagged string literal is like a processing step after the interpolation expressions are evaluated but before the final string value is compiled, 
// ? allowing you more control over generating the string from the literal.