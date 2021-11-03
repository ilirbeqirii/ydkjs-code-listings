class Foo {

    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    gimmeAB() {
        return this.a * this.b;
    }
}

class Bar extends Foo{

    constructor(a, b, c) {
        super(a,b,c);

        this.c = c;
    }

    gimmeABC() {
        return super.gimmeAB() * this.c;
    }

}

var bar = new Bar(1,2,3);
bar.gimmeABC();
bar.gimmeAB();




