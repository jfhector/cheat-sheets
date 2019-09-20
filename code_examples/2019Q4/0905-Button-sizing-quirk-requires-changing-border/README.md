# 0905-Button-sizing-quirk-requires-changing-border

[See it live](https://jfhector.github.io/cheat-sheets/code_examples/2019Q4/0905-Button-sizing-quirk-requires-changing-border/index.html)

## What does it demonstrate?

```
.menu-button {
    min-height: 6em; padding: 1em;
    /* border: 1px solid black; */
}
```

## Notes

* Sizing a `button` element sometimes sometimes doesn't work. It then works if I change the element's preset border (Tested in Chrome)
