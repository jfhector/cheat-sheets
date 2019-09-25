# Fundamentals

## Freshness (constraint on object litterals being assigned to a variable)

[Source: Basarat's chapter on Freshness](https://basarat.gitbooks.io/typescript/content/docs/types/freshness.html)

### What's the rule? 

__Object litterals, when assigned to variables, _must only have known properties_ as defined in the type/interface of the variable they're being assigned to.

__object literals must only specify known properties__. This means that an object litteral passed into a function as an argument can only have the properties (optional or not) described in the interface (or inline type).

If a function argument must conform to an interface, which lists properties `x` and `y` (eg),
then:
.. __a variable/const__ passed as an argument __must have__ the properties `x` and `y` (i.e. similar to implementing a protocol in Swift)
.. __an object literal__ passed as an argument __must only have__ the properties `x` and `y`. (i.e. object literals must only specify known properties)

Eg with a variable:

```
function logName(something: { name: string }) {
    console.log(something.name);
}

var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };
var random = { note: `I don't have a name property` };

logName(person); // okay
logName(animal); // okay
logName(random); // Error: property `name` is missing
```

Eg with an object litteral: 

```
function logName(something: { name: string }) {
    console.log(something.name);
}

logName({ name: 'matt' }); // okay
logName({ name: 'matt', job: 'being awesome' }); // Error: object literals must only specify known properties. `job` is excessive here.
```

#### Why is this Freshness rule only in effect for object litterals?

The reason why only object literals are type checked this way is because in this case additional properties that aren't actually used is almost always a typo or a misunderstanding of the API.

### What's the use case of Freshness?

Freshness avoid typos, by requiring that object litterals to only have known properties.

Eg

```
function logIfHasName(something: { name?: string }) {
    if (something.name) {
        console.log(something.name);
    }
}
var person = { name: 'matt', job: 'being awesome' };
var animal = { name: 'cow', diet: 'vegan, but has milk of own species' };

logIfHasName(person); // okay
logIfHasName(animal); // okay
logIfHasName({neme: 'I just misspelled name to neme'}); // Error: object literals must only specify known properties. `neme` is excessive here.
```

### What do I need to do if I want more flexibility?

A type can include _an index signature_ to explicitely indicate that excess properties are permittted.

```js
var x: { foo: number, [key: string]: any };
x = { foo: 1, baz: 2 };  // Ok, `baz` matched by index signature
```

(Iinstead of `key`, I can use whatever I want. And specify a stricter type than any).




