# SMIL

## SVG animations SHOULD use JavaScript, rather than the <animate> element.

There are various ways to accomplish animation in SVG, depending on the complexity of the image itself, as well as the desired animation effect(s). The acceptable methods are either declarative, using Synchronized Multimedia Integration Language (SMIL) or Cascading Style Sheets (CSS), or through JavaScript DOM manipulation.

Animation could be as simplistic as changing styles or color, or more complex with geometry changes, transformations or showing and hiding various sections of the SVG document.

SMIL can be used to create both simplistic and relatively complex animations of SVGs without the use of CSS or JavaScript, but with one major downfall.** Internet Explorer does not offer support for SMIL**. The silver lining, if you want to look at it in that manner, is that although Internet Explorer will not render the animation, it will still render the final state of the image.

Deque WAS course

### Bad example: Simple animation using the deprecated <animate> element.

```html
<svg>
  <title>A blue square with an animation effect that reveals the square, top down.</title>
  <rect width="200" height="200" fill="blue">
  <animate attributeName="height" from="0" to="200" dur="5s">
  </rect>
</svg>
```