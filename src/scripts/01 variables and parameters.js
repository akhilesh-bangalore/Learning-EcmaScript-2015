// In order to create variables in Javascript, we use the keyword 'var'. But with var, the variable is scoped either
// globally or to the function in which it is defined. The let keyword allows a variable to be block scoped.

// var func = function(options){
//     var number = 33;
//     if(options){
//         var criteria = 'cook'; 
//     }
//     return criteria;
// }

// In the above function - func is global scoped while number and criteria are function scoped.

describe('let -', function () {
    it('scopes a variable to the if block', function () {
        function varDemo(option) {
            if (option) {
                var result = 100;
            }
            return result;
        }

        function letDemo(option) {
            if (option) {
                let result = 100;
                return result;
            }
            // Cannot return from here. This will throw an exception.
            //return result;
        }

        var var1 = varDemo();
        var var2 = varDemo(true);
        var let1 = letDemo();
        var let2 = letDemo(true);

        expect(var1).toBeUndefined();
        expect(var2).toBe(100);
        expect(let1).toBeUndefined();
        expect(let2).toBe(100);
    });

    it('scopes a variable to the loop block', function () {
        function letDemo(option) {
            let sum = 0;
            for (let i = 0; i < 10; i++) {
                sum += i;
            }
            return sum;
        }

        var sum = letDemo();

        expect(sum).toBe(45)

    });
});

//
// const allows us to create a read only variable
// It was not officially recognized as a keyword prior to ES6 but engines like V8 
// used to respect it.
//
describe('const - ', function () {
    it('creates a read-only variable', function () {
        const PI = 3.1416;

        //PI = 3.14159; // Error! Cannot modify

        expect(PI).toBe(3.1416);;
    });

    it('scopes the variable to the block', function () {
        const PI = 3.1416;

        function getPI(precise) {
            const PI = 3.1416;
            if (precise) {
                const PI = 3.14159;
                return PI;
            }
            return PI;
        };

        var roundedPI = getPI();
        var pi = getPI(true);

        expect(roundedPI).toBe(PI);
        expect(pi).toBeLessThan(PI);
    });
});

//
// De-structuring
//

describe('De-structuring - ', function () {
    describe('Arrays - ', function () {
        it('Simple assignment', function () {
            let a = 100;
            let b = -100;

            let [x, y] = [a, b];

            expect(x).toBe(a);
            expect(y).toBe(b);
        });

        it('Assigning returned values', function () {
            let action = function () {
                return [1, 2, 3];
            }

            let [a, b, c] = action();
            let [, q, r] = action();
            let [, x, y, z] = action();

            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
            expect(q).toBe(2);
            expect(r).toBe(3);
            expect(x).toBe(2);
            expect(y).toBe(3);
            expect(z).toBeUndefined();
        });
    });

    describe('Objects - ', function () {
        it('Simple object assignment - ', function () {
            let getCake = function () {
                return {
                    flavour: 'White Forest',
                    weight: 1000, // 1000 gms
                    eggless: true
                };
            };

            let {
                flavour,
                weight
            } = getCake();

            expect(flavour).toBe('White Forest');
            expect(weight).toBe(1000);
        });

        it('Simple object assignment with new names - ', function () {
            let getCake = function () {
                return {
                    flavour: 'White Forest',
                    weight: 1000, // 1000 gms
                    eggless: true
                };
            };

            let {
                flavour: cakeFlavour,
                weight: cakeWeight
            } = getCake();

            expect(cakeFlavour).toBe('White Forest');
            expect(cakeWeight).toBe(1000);
        });

        it('Complex object assignment - ', function () {
            let getCake = function () {
                return {
                    flavour: 'White Forest',
                    properties: {
                        weight: 1000, // 1000 gms
                        eggless: true
                    }
                };
            };

            let {
                flavour: cakeFlavour,
                properties: {
                    weight: cakeWeight
                }
            } = getCake();

            expect(cakeFlavour).toBe('White Forest');
            expect(cakeWeight).toBe(1000);
        });

        it('Function Parameters - ', function () {
            let makeCake = function (flavour, {weight, eggless}) {
                return {
                    flavour: flavour,
                    properties: {
                        weight: weight,
                        eggless: eggless
                    }
                };
            };

            let cake = makeCake('Black Forest', { weight: 200, eggless: false });

            expect(cake.flavour).toBe('Black Forest');
            expect(cake.properties.weight).toBe(200);
        });
    });
});

//
// Default Parameters
// 
// Before introducing this as part of ES6, programmers got around this as below
// var makeCake = function (flavour, properties) {
//     flavour = flavour || 'Vanilla';
//     properties = properties || {weight: 500, eggless: false};

//     //...
// };
//

describe('Default Parameters - ', function () {

    let makeCake = function (flavour = 'Vanilla', weight = 500, eggless = false) {
        return {
            flavour: flavour,
            properties: {
                weight: weight,
                eggless: eggless
            }
        };
    };

    it('Specify default values', function () {

        let vanilla = makeCake();
        let chocolate = makeCake('Chocolate');
        let butterScotch = makeCake('Butter Scotch', 300);
        let blackForest = makeCake('Black Forest', 1000, true);

        expect(vanilla.flavour).toBe('Vanilla');
        expect(vanilla.properties.weight).toBe(500);
        expect(vanilla.properties.eggless).toBe(false);

        expect(chocolate.flavour).toBe('Chocolate');
        expect(chocolate.properties.weight).toBe(500);
        expect(chocolate.properties.eggless).toBe(false);

        expect(butterScotch.flavour).toBe('Butter Scotch');
        expect(butterScotch.properties.weight).toBe(300);
        expect(butterScotch.properties.eggless).toBe(false);

        expect(blackForest.flavour).toBe('Black Forest');
        expect(blackForest.properties.weight).toBe(1000);
        expect(blackForest.properties.eggless).toBe(true);
    });

    it('Works only with undefined', function () {

        let vanilla = makeCake('');

        // expect(vanilla.flavour).toBe('Vanilla');
        expect(vanilla.flavour).toBe('');
        expect(vanilla.properties.weight).toBe(500);
        expect(vanilla.properties.eggless).toBe(false);
    });

    it('Can be used in combination with de-structuring', function () {
        let makeCake = function (flavour = 'Vanilla', {weight = 500, eggless = false}) {
            return {
                flavour: flavour,
                properties: {
                    weight: weight,
                    eggless: eggless
                }
            };
        };

        let vanilla = makeCake(undefined, {});
        let chocolate = makeCake('Chocolate', {});
        let butterScotch = makeCake('Butter Scotch', { weight: 300 });
        let blackForest = makeCake('Black Forest', { weight: 1000, eggless: true });

        expect(vanilla.flavour).toBe('Vanilla');
        expect(vanilla.properties.weight).toBe(500);
        expect(vanilla.properties.eggless).toBe(false);

        expect(chocolate.flavour).toBe('Chocolate');
        expect(chocolate.properties.weight).toBe(500);
        expect(chocolate.properties.eggless).toBe(false);

        expect(butterScotch.flavour).toBe('Butter Scotch');
        expect(butterScotch.properties.weight).toBe(300);
        expect(butterScotch.properties.eggless).toBe(false);

        expect(blackForest.flavour).toBe('Black Forest');
        expect(blackForest.properties.weight).toBe(1000);
        expect(blackForest.properties.eggless).toBe(true);
    });
});

//
// Variable number of parameters
//
// Before ES6, this was achieved using arguments.
// For example
// function average() {
//     var result = 0.0;
//     for (var i = 0; i < arguments.length; i++) {
//         result += arguments[i];
//     }
//     return result / arguments.length;
// }
//

describe('Variable numbers of function parameters - ', function () {
    let average = function (...numbers) {
        let result = 0.0;
        for (let i = 0; i < numbers.length; i++) {
            result += numbers[i];
        }
        return result / numbers.length;
    };

    it('Similar to ellipsis', function () {
        let avg = average(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        expect(avg).toBe(5.5);
    });
});

//
// Spread operator
//
// Allows to spread the elements in an array across the function parameters

describe('Spread - ', function () {

    let average = function (a, b, c) {
        return (a + b + c) / 3;
    }

    it('array elements across function parameters', function () {
        let avg01 = average(...[1, 2, 3]);
        let avg02 = average(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        expect(avg01).toBe(2);
        expect(avg02).toBe(2);
    });
});

//
// Templates
//
// This feature allows us to build literals at runtime by replacing placeholders

describe('Templates - ', function () {
    it('allows us to build literals at runtime', function () {

        let greet = function (greeting = 'hello', name = '') {
            return (`${greeting} ${name}`).trim();
        };

        let wish01 = greet();
        let wish02 = greet('hi');
        let wish03 = greet('hi', 'ES6');

        expect(wish01).toBe('hello');
        expect(wish02).toBe('hi');
        expect(wish03).toBe('hi ES6');
    });

    it('allows expressions', function () {

        let x = 5;
        let y = 25;
        let result = `${x} + ${y} = ${x + y}`;

        expect(result).toBe('5 + 25 = 30');
    });

    it('can be passed as function parameters', function () {

        let expProcessor = function (strs, ...nums) {
            let strings = '';
            for (let i = 0; i < strs.length; i++) {
                strings += strs[i] + '|';
            }

            let values = '';
            for (let i = 0; i < nums.length; i++) {
                values += nums[i] + '|';
            }

            return {
                strings: strings,
                values: values
            }
        };
        let x = 5;
        let y = 25;
        let result = expProcessor`${x} + ${y} is ${x + y}`;

        expect(result.strings).toBe('| + | is ||');
        expect(result.values).toBe('5|25|30|');
    });
});