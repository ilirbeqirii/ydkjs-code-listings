// Yeah, indeed, let’s ask ourselves, how it should technically work? When an object method runs, it gets the current object as this. If we call super.method() then, 
// the engine needs to get the method from the prototype of the current object. But how?

// let animal = {
//     name: 'Animal',
//     eat() {
//         alert(`${this.name} eats.`);
//     }
// };

// let rabbit = {
//     __proto__: animal,
//     eat() {
//        this.__proto__.eat.call(this);
//     }
// };

// let longEar = {
//     __proto__: rabbit,
//     eat() {
//         this.__proto__.eat.call(this);
//     }
// };

// longEar.eat(); // Maximum call stack size exceeded

// * [[HomeObject]] special internal property of funtions - When a function is specified as a class or object method, its [[HomeObject]] property becomes that object.
// * Then super uses it to resolve the parent prototype and its methods.


let animal = {
    name: 'Animal',
    eat() { // animal.eat.[[HomeObject]] = animal;
        console.log(`${this.name} eats!`);
    }
};

let rabbit = {
    __proto__: animal,
    name: 'Rabbit',
    eat() { // rabbit.eat.[[HomeObject]] = rabbit;
        super.eat();
    }
}

let longEar = {
    __proto__: rabbit,
    name: 'LongEar',
    eat() { // rabbit.eat.[[HomeObject]] = longEar;
        super.eat();
    }
};

longEar.eat();


// *As we’ve known before, generally functions are “free”, not bound to objects in JavaScript. So they can be copied between objects and called with another this.

// *The very existence of [[HomeObject]] violates that principle, because methods remember their objects. [[HomeObject]] can’t be changed, so this bond is forever.

// *The only place in the language where [[HomeObject]] is used – is super. So, if a method does not use super, then we can still consider it free and copy between objects. 
// *But with super things may go wrong.

let animal1 = {
    sayHi() {
        console.log('I am an animal!');
    }
};

let rabbit1 = {
    __proto__: animal1,
    sayHi() {
        super.sayHi();
    }
};

let plant = {
    sayHi() {
        console.log('I am plant');
    }
};

let tree = {
    __proto__: plant,
    sayHi: rabbit1.sayHi
};

tree.sayHi();

// * Methods, not function properties
// * [[HomeObject]] is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as method(), not as "method: function()".

// * The difference may be non-essential for us, but it’s important for JavaScript.

let animal2 = {
    eat: function () { // intentionally writing like this instead of eat() {...
        // ...
    }
};

let rabbit2 = {
    __proto__: animal2,
    eat: function () {
        super.eat();
    }
};

rabbit2.eat();