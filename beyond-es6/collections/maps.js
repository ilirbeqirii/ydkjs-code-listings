// * If you have a lot of JS experience, you know that objects are the primary mechanism for creating unordered key/value-pair data structures, otherwise known as maps. 
// * However, the major drawback with objects-as-maps is the inability to use a non-string value as the key.

var m = new Map();

var x = { id: 1 }, y = { id: 2 };

m.set(x, 'foo');
m.set(y, 'bar');

console.log(m.get(x));
console.log(m.get(y));

console.log(m);

// we use get and set instead of brackets[]

m.delete(y);
console.log(m);

// To delete an element from a map, don't use the delete operator, but instead use the delete(..) method

m.set(y, 'bar');
console.log(m);

console.log(m.size);

m.clear()

console.log(m.size);

// You can clear the entire map's contents with clear(). To get the length of a map (i.e., the number of keys), use the size property (not length):

console.log(m.values());

// To get the list of values from a map, use values(..), which returns an iterator

console.log(m.keys());

// To get the list of keys, use keys(), which returns an iterator over the keys in the map:

console.log(m.entries());

// you can iterate over a map's entries using entries() (or the default map iterator)
m.set(x, 'foo');

console.log(m.has(x));
console.log(m.has(y));

// To determine if a map has a given key, use has(..):

// * Note:
// ? Maps essentially let you associate some extra piece of information (the value) with an object (the key) without actually putting that information on the object itself.