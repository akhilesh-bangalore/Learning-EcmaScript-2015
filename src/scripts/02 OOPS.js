//
// class
//
// class can be used to build a blue print for defining objects in javascript.
// Although, we had the ability to construct objects in javascript prior to ES6
// introduction of class makes it simpler.

describe('class - ', function () {
    it('defines a blue print for building actual objects', function () {
        class Cake {
            bake() {
                return 'Baked!';
            }
        }

        let c = new Cake();

        expect(c.bake()).toBe('Baked!');
    });

    it('initilize object with constructor parameters', function () {

        class Cake {
            constructor(flavour = 'Vanilla', weight = 300, eggless = false) {
                this._flavour = flavour;
                this._properties = {
                    weight: weight,
                    eggless: eggless
                }
            }
            bake() {
                return {
                    flavour: this._flavour,
                    properties: this._properties,
                    status: 'Baked!'
                };
            }
        }

        let myCake = new Cake().bake();

        expect(myCake.flavour).toBe('Vanilla');
        expect(myCake.status).toBe('Baked!');
        expect(myCake.properties.weight).toBe(300);
        expect(myCake.properties.eggless).toBe(false);
    });



    describe('encapsulate -', function () {
        //
        // Getters and Setters give a provision for developers to invoke methods as properties
        //

        it('demonstrating getters - ', function () {

            class Line {
                constructor(length) {
                    this._length = length;
                }

                get length() {
                    return Math.round(this._length);
                }
            }

            let line01 = new Line(10);
            let line02 = new Line(10.3);
            let line03 = new Line(10.8);

            expect(line01.length).toBe(10);
            expect(line02.length).toBe(10);
            expect(line03.length).toBe(11);
        });

        describe('demonstrating setters - ', function () {
            it('simple setter', function () {
                class Line {
                    constructor(length) {
                        this._length = length;
                    }

                    get length() {
                        return Math.round(this._length);
                    }

                    set length(newLength) {
                        this._length = newLength;
                    }
                }

                let line01 = new Line(10);
                line01.length = 11;
                expect(line01.length).toBe(11);
            });
            it('calling setter from constructor', function () {
                class Line {
                    constructor(length) {
                        this.length = length; // this will call the setter
                    }

                    get length() {
                        return Math.round(this._length);
                    }

                    set length(newLength) {
                        this._length = newLength; // we still need the backing field so that the getter can work as expected
                    }
                }

                let line01 = new Line(10);
                line01.length = 11;
                expect(line01.length).toBe(11);
            });

        });
    });

    describe('inherit - ', function () {
        it('single level inheritance', function () {
            class Employee {
                constructor(empId, name) {
                    this.id = empId;
                    this.name = name;
                }

                get id() {
                    return this._id;
                }

                set id(newId) {
                    this._id = newId;
                }

                get name() {
                    return this._name;
                }

                set name(newName) {
                    this._name = newName;
                }
            }

            class Manager extends Employee {
                whoAmI() {
                    return `I am ${this.name}. I am a manager`;
                }
            }

            let m01 = new Manager(101, 'Bill');
            expect(m01.whoAmI()).toBe('I am Bill. I am a manager');
        });

        describe('super', function () {
            it('demonstrate usage in constructor', function () {
                class Employee {
                    constructor(empId, name) {
                        this.id = empId;
                        this.name = name;
                    }

                    get id() {
                        return this._id;
                    }

                    set id(newId) {
                        this._id = newId;
                    }

                    get name() {
                        return this._name;
                    }

                    set name(newName) {
                        this._name = newName;
                    }
                }

                class Manager extends Employee {
                    constructor(mgrId, name, shift) {
                        super(mgrId, name);
                        this.shift = shift;
                    }

                    get shift() {
                        return this._shift;
                    }

                    set shift(newShift) {
                        this._shift = newShift;
                    }

                    whoAmI() {
                        return `I am ${this.name}. I am a manager and I work between ${this.shift}`;
                    }
                }

                let m01 = new Manager(101, 'Bill', '9AM - 6PM');
                expect(m01.whoAmI()).toBe('I am Bill. I am a manager and I work between 9AM - 6PM');

            });
            it('overriding usage in methods', function () {

                class Employee {
                    constructor(empId, name) {
                        this.id = empId;
                        this.name = name;
                    }

                    get id() {
                        return this._id;
                    }

                    set id(newId) {
                        this._id = newId;
                    }

                    get name() {
                        return this._name;
                    }

                    set name(newName) {
                        this._name = newName;
                    }

                    whoAmI() {
                        return `I am ${this.name}.`;
                    }
                }

                class Manager extends Employee {
                    constructor(mgrId, name, shift) {
                        super(mgrId, name);
                        this.shift = shift;
                    }

                    get shift() {
                        return this._shift;
                    }

                    set shift(newShift) {
                        this._shift = newShift;
                    }

                    whoAmI() {
                        let superR = super.whoAmI();
                        return `${superR} I am a manager and I work between ${this.shift}`;
                    }
                }

                let e01 = new Employee(101, 'Bob');
                let m01 = new Manager(101, 'Bill', '9AM - 6PM');
                expect(e01.whoAmI()).toBe('I am Bob.');
                expect(m01.whoAmI()).toBe('I am Bill. I am a manager and I work between 9AM - 6PM');

            });
        });

        it('overriding default behaviour', function () {
            class Diagram { // A class inherits from Object by default

            }

            class Rectangle extends Diagram {
                toString() {
                    return '[Rectangle]';
                }
            }

            let d01 = new Diagram();
            let d02 = new Rectangle();

            expect(d01.toString()).toBe('[object Object]');
            expect(d02.toString()).toBe('[Rectangle]');
        })
    });
});