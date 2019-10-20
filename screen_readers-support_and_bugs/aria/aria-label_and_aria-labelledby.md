# `aria-label` and `aria-labelledby`

## `aria-label` doesn't work when put on an HTML element that won't be in the accessibility tree, like a `div` or a `span`

(I imagine that the same applies to `aria-labelledby`)

### Consequence: icon fonts need `role='img'`, otherwise their alternative text via `aria-label` doesn't get read out by screen readers

```html
<p>
  Have a great day 
  <span class="fa fa-smile-o" role="img" aria-label="Smiley face"></span>
</p>
```

## (It looks like – infered –) `aria-label` doesn't work when put on an HTML element is not either focusable or a landmark region

Infered from [this paragraph](https://dequeuniversity.com/class/visual-design2/css/css-generated):

Even though CSS-generated content should be avoided under most circumstances, there may be some acceptable uses of it. If the generated content is informative — in other words if a blind user needs to know about the content — then a text alternative must be provided to account for the screen reader limitations of JAWS + Internet Explorer and Narrator + Edge. If both of those browsers supported CSS-generated content, there would be no need to provide a text alternative.

It gets a little complicated because some screen readers do support CSS-generated content. To take all scenarios into account, developers should hide the generated text from all screen readers using aria-hidden="true" and provide a text alternative some other way, such as **via aria-label, if the item is a link, button, form control, or other focusable item. If it is not a focusable item, it may be necessary to use a technique such as CSS hidden text** (using position:absolute; clip:rect(0 0 0 0)).

(I imagine that the same applies to `aria-labelledby`)