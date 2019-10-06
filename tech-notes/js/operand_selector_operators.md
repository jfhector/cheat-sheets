# Operand selector operators (most comonly called 'logical-and' and 'logical-or' operators)

In JS (and Python and Ruby), `&&` and `||` don't actually result in a `boolean` value, like they do in other languages.

They result in the value of one of their two operands. i.e. They select one of their two operands' value.

* `a || b` is roughly equivalent to `a ? a : b`
* `a && b` is roughly equivalent to `a? b: a`

## `||`

### Use cases

#### To set default parameters in ES5

```js
function foo(a, b) {
    a = a || 'hello';
    b = b || 'world';
    return a + " " + b;
}

foo("cool", "beanz"); // "cool beans"

foo("cool", ""); // "cool world"
// Gotcha, because `""` is falsy
```

## `&&`

### To form a 'guard operator'

The first expression is a test that 'guards' the second expression:

```js
function foo() {
    console.log(a);
}

var a = 42;

a && foo(a);
```

(This is a bad example because it still throws a `ReferenceError` if `a` is not defined).



