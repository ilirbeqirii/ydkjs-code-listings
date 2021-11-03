var p = new Promise((resolve, reject) => {
    setTimeout(() => resolve('It is resolved now!!'), 5000);
});

console.log('First here....');

p.then(function () { // first queued 
   p.then(function () { // third queued
       console.log('C');
   }) 

   console.log('A');
});

console.log('Then here....');

p.then(function () { // second queued
    console.log('B');
});