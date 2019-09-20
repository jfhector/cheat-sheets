# 0905CID-Centering-an-element-in-container

[See it live](https://jfhector.github.io/cheat-sheets/code_examples/2019Q4/0905CID-Centering-an-element-in-container/index.html)

## What does it demonstrate?

### Centering an absolutely positioned element inside a container, using negative margins

```
.container {
  width: 20em;
  height: 20em;
  position: relative;
}

.element {
  width: 4em;
  height: 4em;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -2em;
  margin-top: -2em;
  background-color: red;
}
```

This can also be done with `transform` `translate(-50%, -50%)`. 

## Notes

* To easily absolutely position an element at the centre of a container:
  * use `top` and `left` `50%`
  * then:
    * offset its height and width using negative margins
    * or `transform` `translate(-50%, -50%)`. 


