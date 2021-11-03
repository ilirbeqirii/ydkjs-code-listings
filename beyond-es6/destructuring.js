// ? ES6 introduces a new syntactic feature called destructuring, which may be a little less confusing if you instead think of it as structured assignment.

// To understand, consider this:

function foo() {
    return [1, 2, 3];
}

var tmp = foo(), a = tmp[0], b = tmp[1], c = tmp[2];

console.log(a, b, c);

// Same happens with objects"

function fooObj() {
    return {
        x: 4,
        y: 5,
        z: 6
    };
}

var tmpObj = fooObj(), x = tmpObj.x, y = tmpObj.y, z = tmpObj.z;

console.log(x, y, z);


// ? ES6 adds a dedicated syntax for destructuring, specifically array destructuring and object destructuring.
// (this eliminates the need for tmp variable)

function fooObj1() {
    return {
        x1: 4,
        y1: 5,
        z1: 6
    };
}

var [a1, b1, c1] = foo();
console.log(a1, b1, c1);

var { x1, y1, z1 } = fooObj1();
console.log(x1, y1, z1);

// ? assign property to a variable with different name

var { x: xVar, y: yVar, z: zVar } = fooObj();
console.log(xVar, yVar, zVar);

// ? object mappings
var o1 = { a: 1, b: 2, c: 3 };
var o2 = {};

({ a: o2.x, b: o2.y, c: o2.z } = o1);
console.log(o2);

// ? map object to array
var arr2 = [];
({ a: arr2[0], b: arr2[1], c: arr2[2] } = o1);
console.log(arr2);

// ? map array to object
var obj1 = {};
var arr1 = [1, 2, 3];

([obj1.a, obj1.b, obj1.c] = arr1);
console.log(obj1);