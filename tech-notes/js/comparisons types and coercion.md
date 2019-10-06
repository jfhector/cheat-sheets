# Comparisons, types and coercion 

## Types

In JS, variables don't have types, but values have types. Variables can hold values of any type at any point. (They don't enforce any type).

### Built-in types

JS has 7 built-in types.

* `null`
* `undefined`
* `number`
* `string`
* `boolean`
* `symbol`
* `object` 

All of these except for `object` are called 'primitives'. 

### Type checking

#### `typeof` operator

Examines a value and returns a string representing what type the value is of.

```js
var a;
typeof a; // 'undefined'

typeof 42; // 'number'

typeof '42'; // 'string'

typeof true; // 'boolean'

typeof undefined; // 'undefined'

typeof null; // 'object' !!! This is a JavaScript bug

typeof { a: '42' }; // 'object'

typeof []; // 'object'

typeof Symbol(); // 'symbol'

typeof function foo() { return '42' } // 'function';

typeof foo; // 'function'

typeof foo(); // 'string'

// Note: b is not declared
typeof b; // 'undefined'
```

##### How to test for a `null` value

`null` is the only value combines these two characteristics:
* is falsy (so `!null` is `true`)
* and `typeof null === 'object'`

So a good test is:

```js
var a = null;

if (!a && typeof a === 'object') {
    // will run
}
```

##### typeof undeclared helpfully returns `'undefined'`, rather than a referene error

This type guard is helpful for safely checking the existence of a variable, without risking getting a `ReferenceError`.

```js
// This would throw an error:
if (DEBUG) {
    console.log('Debug mode is starting.')
}

// This is safe:
if (typeof DEBUG !== 'undefined') {
    console.log('Debug mode is starting.')
}

// And is how to check whether a polyfill is needed:
if (typeof atob === 'undefined') {
     atob = function () { /* ... */ }
}
```

Note: another way to safely check for the existence of a variable in the global scope is to remember that, if it exists, it also exists on the `windows` object, and that there's no `ReferenceError` thrown if I try to access a property that doesn't exist on an object:

```js
if (window.DEBUG) {
     atob = function () { /* ... */ }
}

if (!window.atob) {
     atob = function () { /* ... */ }
}
```

### Primitives are value types; objects (and functions, which are objects) are reference types

In many other languages (e.g. C++), values can either be passed by value-copy or reference-copy with different syntaxes. That's not possible in JS. In JS, the type of the value solely controls whether that value will be passed by value-copy of reference-copy:

```js
var a = 1;
var b = a; // the value of a is copied and assigned to b
b++;
a // 1;
b // 2;

var c = [1,2,3];
var d = c; // d gets a reference to the same object that c is refering to 
c.push(4);
c // [1,2,3,4]
d // [1,2,3,4]
```

* Simple values (aka 'scalar primitives') are always assigned/passed by value-copy:
  * `undefined`
  * `null`
  * `string`
  * `number`
  * `boolean`
  * `symbol`
* Compound values (objects, including arrays, functions, and all boxed values such as `String()`, `Number()` and `Boolean()`) always create a copy of the reference on assignment or passing.

Also, in JS, there are no pointers, and I cannot have a reference from one JS variable to another JS variable. A reference in JS points to a (shared) value; so if I have 10 references, they are all always 10 distinct references to the same shared value. None of them are references/pointers to each other.

Since references point to the value themselves and not to the variables, you cannot use one reference to change where another one is pointed:

```js
var a = [1,2,3];
var b = a;

b = "foo";

a; // [1,2,3,4]
b; // "foo"
```

The most common way such confusion happens is with function parameters:

```js
function foo(x) {
    x.push(4);
    x = [5,6,7];
    x.push(8);
}

a = [1,2,3];
foo(a);
a // [1,2,3,4], not [5,6,7,8]
```

There is no way to use the `x` reference to change where `a` is pointing. I can only modify the content of the shared value that both `a` and `x` are pointing to.

#### How to simulate passing a compound value (like an array) by value-copy

To effectively pass a compound value (like an array) by value-copy, I need to manually make a copy of it, so that the reference passed doesn't still point to the original.

`array.prototype.slice()` is a good way to do this for arrays:

```js
var a = [1,2,3];
var b = a.slice();
b.push(4);
a; // [1,2,3]
b; // [1,2,3,4]
```

#### How to simulate passing a scalar primitive value (like a number) by reference-copy

To simulate passing a scalar primitive value (like a number) by reference-copy, I need to  wrap it in a compound value (like an object or an array) that can be passed by reference-copy.

```js
var a = 42;
var b = { a: a };
var c = b;
c.a = c.a + 1;
b; // { a: 43 }
c; // { a: 43 }
```

## Coercion

Converting a value from one type to another is often called 'type casting' when done explicitly, and 'coercion' when done implicitly. (It's subjective what's implicit vs explicit).

Implicit coercion happens when I use a value in such a way that it forces the value to be converted.

Coercion in JS always results in one of the scalar primitive types (`number`, `string` or `boolean`). No coercion results in a compound value (like `object` or `function`). ('Boxing' – what happens when I call a String.prototype method on a string litteral for example - is not coercion strictly speaking).

Built-in primitives have natural stringification:
* `null` becomes `'null'`
* `undefined` becomes `'undefined'`
* `true` becomes `'true'`
* `42` becomes `'42'` (but very large numbers are expressed in exponent form )

For regular objects, unless you specify your own, the default `toString()` (defined on `Object.prototype`), will return the internal `[[Class]]`, like for instance `[object Object]`, `[object String]` or `[object Array]`.

Arrays have an overriden default `toString`, which returns a (string) concatenation of its values (each stringified themselves) with `','` in between each value:

```js
[1,2,3].toString(); // "1,2,3"
[1,2,3] + ""; // "1,2,3"
```








#### From string to number

##### Explicitely

Use the `Number()` function, but **very importantly** do not use the `new` keyword in front of them, so that they do not return a new object wrapper.

```js
var a = '42';
var b = Number(a);

console.log(b); // 42
```

##### Implicitely

Strings containing just a number get implicitly coerced to numbers:

```js
var a = '42';
var b = a * 1; // 42
var c = a / 1; // 42
var d = +a; // 42 (Unary operator)
var e = a - 0; // 42 (the `-` operator is only defined for numbers) (this is less common)
```

Strings that contain anything else than just a number get implicitly coerced to `NaN`:

```js
var a = '42';
var b = 'foo';
a < b // false
a > b // false
a == b // false
```

#### From non-string values to number

##### Implicitely

* `true` becomes `1`
* `false` becomes `0`
* `undefined` becomes `NaN`
* `null` becomes `0`, surprisingly
* Objects (and arrays) will be converted to their string value first, then coerced to a number
* `[3] - [1] === 2` because `-` is only defined for numbers, so both arrays are coerced to strings first, then numbers

#### From number to string

##### Explicitely

Use the `String()` function, but **very importantly** do not use the `new` keyword in front of them, so that they do not return a new object wrapper.

```js
var a = 42;
var b = String(a);
b; // "42"
```

Alternatively, I can also use `.toString()` (which will automatically box the number and then return its string equivalent).

```js
var a = 42;
a.toString(); // '42' 
```

##### Implicitly

The `+` operator combined with one of the operands being a `string` value (or a compound value that will get coerced to a string) will insist on the operation being a string concatenation.

If the other operand is a number, the above has the effect of forcing it to be coerced into its string equivalent.

```js
var a = 42;
var b = a + "";
b; // "42"

var c = [1,2];
var d = [3,4];
c + d; // "1,23,4 "
```

#### To boolean

##### Explicitly

I can use the `Boolean()` function, but **very importantly** do not use the `new` keyword in front of them, so that they do not return a new object wrapper. But somehow this is not common among JS developers: they tend to use `!!`.

```js
var a = "0";
var b = [];
var c = {};

var d = 0;
var e = "";
var f = null;
var g;

!!a; // true
!!b; // true
!!c; // true

!!d; // false;
!!e; // false;
!!f; // false;
!!g; // false; 
```

##### Implicitly

###### Operators that force a value to be coerced to a boolean:

Any value used in these contexts that is not already a boolean will be coerced to a boolean:

* The test expression in an `if (...) { ... }` statement
* The test expression in a `for ( .. ; .. ; ..)` header
* The test expressions in `while (..) { ... }` and `do ... while (...)` loops
* The test expression in ternary (`?`) operations
* The left-hand operand (which serves as a test expression) of the logical-or (`||`) and logical-and (`&&`) operators

###### Exhaustive list of falsy values

* `undefined`
* `null`
* `0`, `-0` and `NaN` (invalid number)
* `""` and `''` (empty strings)

###### Be careful: these are *not* falsy values

* `[]`
* `{}`
* `"false"`
* `""`
* `"0"`
* `new Boolean(false)`
* `new Number(0)`
* `new String("")`

(The last three are objects, wrapped around falsy values. They are not falsy).

#### From array to string

##### Explicitly

TODO

##### Implicitly

Arrays are coerced to strings, simply joining the values with commas in between.

```js
var a = [1, 2, 3];
var b = "1,2,3";
a == b; // true
a === b; // false
```

#### From `Date` to `number`

This gives me the unix timestamp (number of milliseconds elapsed since 1 January 1970 00:00:00 UTC).

##### Explicitly

I can just use the `.getTime()` method on a `Date` instance:

```js
var timestamp = new Date().getTime();
// or var timestamp = (new Date()).getTime();
// or var timestamp = (new Date).getTime();
```

... or the `.now()` method on the `Date` contructor:

```js
var timestamp = Date.now(); 
```

##### Implicitly

```js
var date = new Date("Mon, 18 August 2014 08:53:43 CDT");
+d; // 1408369986000  (Using the unary operator)
```

The most common use of this idiom is to get the *now* moment as a timestamp:

```js
var timestamp = +new Date();
```

or, because the parens can be omitted on a constructor call if there are no parameters:

```js
var timestamp = +new Date; // But this is not good for readability
```




















## Comparisons

### `==` (loose equals operator) vs `===` (strict equals operator)

* `==` checks for equality with coercion allowed
* `===` checks for equality without allowing coercion

If I make the comparison `'99' == 99`, '99' gets implicitly coerced into the number `99`, and then the comparison is made between `99` and `99`.

#### When to use `==` vs `===`

* If either value could be `true` or `false`, avoid `==` and use `===` instead.
* If either value could be `0`, `""` or `[]`, avoid `==` and use `===` instead.
* If *all* other cases, I am safe to use `==` and it'll often simplify my code.

### Used on non-primitives (e.g. object, array, function, ...), `==` and `===` checks for identify of the references (it doesn't compare alues)

Because these values are held by reference, both `==` and `===` will simply check whether the references match, not anything about the underlying values.

```js
var a = [1, 2, 3];
var b = [1, 2, 3];
var c = "1,2,3";
a == c; // true
b == c; // true
a == b; // false
```

### Inequality operators allow coercion. There's not 'strict' (i.e. coercion not allowed) inequality operator

```js
'42' < 43 // true
'41' < '42' // true
```

### When `==` and `===` don't cut it

#### `NaN`

Weirdly, `NaN` is never equal to itself.

#### `-0` and `0`

```js
-0 === 0 // true
```

#### Solution: Use `Object.is(a, b)`

`Object.is(a, b)` is a new ES6 utility that can be used to check two values for string equality, without those exceptions:

```js
var a = NaN;
var b = NaN;
var c = 0;
var d = -0;
Object.is(a, b); // true
Object.is(c, d); // false
```

It's better to not use `Object.is()` when `===` cuts it as it's more idiomatic and efficient.
