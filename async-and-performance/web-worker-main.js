
var worker = new Worker('my-cool-web-worker.js');

worker.addEventListener("message", function (ev) {
    console.log(ev.data);
});

worker.postMessage('Inside worker: This is message from program!');


setTimeout(() => {
    worker.terminate();
}, 1000);