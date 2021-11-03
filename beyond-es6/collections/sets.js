var s = new Set();

var x = { id: 1 }, y = { id: 2 };

s.add(x);
s.add(y);
s.add(x);

console.log(s.size);

s.delete(y);

console.log(s.size);

s.clear()

console.log(s.size);

// constructor form

var s1 = new Set([x, y]);

console.log(s1.has(x));
console.log(s1.has(y));

// set iterators - same iterator methods as 'maps'

console.log(s1.values());
console.log(s1.keys());

// The keys() and values() iterators both yield a list of the unique values in the set.


console.log(s1.entries());
// The entries() iterator yields a list of entry arrays, where both items of the array are the unique set value. The default iterator for a set is its values() iterator.


var s = new Set([1, 2, 3, 4, "1", 2, 4, "5"]),
    uniques = [...s];

console.log(uniques);						// [1,2,3,4,"1","5"]
