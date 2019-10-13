# Positioning

* To easily absolutely [position an element at the centre of a container](./../../code_examples/2019Q4/0905CID-Centering-an-element-in-container/README.md):
  * use `top` and `left` `50%`
  * then:
    * offset its height and width using negative margins
    * or `transform` `translate(-50%, -50%)`. 

* To position a tooltip just below its triggering element, use `top: 100%;`

```css
.tooltip {
	font-size: .825rem;
	left: 0;
	min-width: 20ch;
	max-width: 44ch;
	pointer-events: none;
	position: absolute;
	top: 100%;
	z-index: 2;
}
```