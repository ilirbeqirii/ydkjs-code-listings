// this is worker environment

addEventListener('message', function (ev) {
    console.log(ev.data);
});

postMessage('Inside main program: The message from web worker!');


// load other JS scripts - synchronous loading
importScripts('bar.js', 'foo.js');

setTimeout(() => {
   console.log('Timer fired');
}, 1000);