// * WeakMaps take (only) objects as keys. Those objects are held weakly, which means if the object itself is GC'd, the entry in the WeakMap is also removed.

var vm = new WeakMap();
var x = { id: 1 }, y = { id: 2 };

vm.set(x, 'foo');
// vm.set(1, 'foo');
// ! TypeError: Invalid value used as weak map key
// ?  WeakMaps take (only) objects as keys

console.log(vm.has(x));
console.log(vm.has(y));

// WeakMaps do not have a size property or clear() method, nor do they expose any iterators over their keys, values, or entries

var z = { id: 3 },
    w = { id: 4 };

vm.set(x, y);

x = null;                       // { id: 1 } is GC-eligible
y = null;						// { id: 2 } is GC-eligible
// only because { id: 1 } is

m.set(z, w);
w = null;						// { id: 4 } is not GC-eligible

// * It's important to note that a WeakMap only holds its keys weakly, not its values. Consider: