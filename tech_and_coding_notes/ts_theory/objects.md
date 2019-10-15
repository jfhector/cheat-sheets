# Objects

## Specifying index signatures for objects

```
var x: { foo: number, [key: string]: any };
x = { foo: 1, baz: 2 };  // Ok, `baz` matched by index signature
```

(Note: instead of `key`, I can use whatever I want). (And obviously specify a stricter type than any).
