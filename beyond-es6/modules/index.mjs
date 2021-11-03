console.log(foo); // declarations that occur as a result of import are hoisted

import { foo } from './foo.mjs';
// import { default as fooFN } from './default.mjs' -> explicit rename
import fooFN from './default.mjs' // => implicit rename
// import fn from './default.mjs' => implicit rename with different identifier than the one imported.
import defaultFooFN, { bar, baz } from './default-named.mjs';


console.log(foo);
console.log(fooFN);
// console.log(fn);

console.log(defaultFooFN);
console.log(bar);
console.log(baz);



foo = 5; // this will throw error.