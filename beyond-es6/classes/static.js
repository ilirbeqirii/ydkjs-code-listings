class Foo {

    constructor() { }

    static cool() { 
        console.log('Cool');
    }

    wow() {
        console.log('wow');
    }
}

class Bar extends Foo {

    constructor() {
        super();
    }

    static awesome() {
        super.cool();
        console.log('awesome');
    }

    neat() {
        super.wow();
        console.log('neat');
    }

}

Foo.cool(); // cool
Bar.cool(); // cool
Bar.awesome() // cool 
                // awesome

var b = new Bar();
b.wow(); // wow
b.neat() // neat

b.cool; // undefined
b.awesome; // undefined