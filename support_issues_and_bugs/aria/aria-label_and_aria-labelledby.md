# `aria-label` and `aria-labelledby`

## `aria-label` and `aria-labelledby` support is best on inherently focusable HTML elements (e.g. `<a>`, `<input>`), elements with semantic meaning (e.g. not `<div>` or `<span>`), and elements inside an application region.

The aria-label and aria-labelledby attributes allow you to assign a name or label to almost any HTML element: links, form fields, paragraphs, etc., though screen reader support is best on focusable elements, or on elements in application regions as explained later. In practice, screen reader support for aria-label and aria-labelledby is best on:

* Focusable elements (`<a>`, `<input>`, etc.). Support is not as good on non-focusable elements (`<p>`, `<div>`, `<span>`, `<h1>`, etc.).
* Elements with semantic meaning, as opposed to the elements that do not have semantic meaning (like `<div>` and `<span>`).
* Application regions (role="application"). But be very careful with application regions, because they disable most of the screen reader's regular keyboard shortcuts.

In principle, you ought to be able to apply aria-label to any HTML element, whether it is a paragraph, heading, form element, link, image, or anything else. In practice, the aria-label attribute is supported better on some elements than on others, and not all screen readers — or versions of the same screen reader — support aria-label in the same way.

To complicate matters, the support for aria-label is generally better when labeling an item inside an application region (a section of the web page marked as role="application") than when labeling an item in a regular document area of the web page. 

Even more confusing, the **support may depend on what screen reader mode you are using**. For example, if you let the screen reader read straight through the document (in document or reading mode), it may not read the aria-label value on some elements, but when you navigate sequentially by element, or if you tab to the element (in form reading mode), the same screen reader may read the aria-label value. And to add yet another layer of complexity, different browsers or versions of the same browser may behave differently with the same brand of screen reader.

A somewhat oversimplified summary is that support for aria-label is best:
* on focusable elements (`<a>`, `<input>`, etc.), or
* on elements inside an application region (e.g. `<div role="application">`)

### `aria-label` doesn't work when put on an HTML element that won't be in the accessibility tree, like a `div` or a `span`

(I imagine that the same applies to `aria-labelledby`)

#### Consequence: icon fonts need `role='img'`, otherwise their alternative text via `aria-label` doesn't get read out by screen readers

```html
<p>
  Have a great day 
  <span class="fa fa-smile-o" role="img" aria-label="Smiley face"></span>
</p>
```

### `aria-label` doesn't work when put on an HTML element is not either focusable or a landmark region

Infered from [this paragraph](https://dequeuniversity.com/class/visual-design2/css/css-generated):

Even though CSS-generated content should be avoided under most circumstances, there may be some acceptable uses of it. If the generated content is informative — in other words if a blind user needs to know about the content — then a text alternative must be provided to account for the screen reader limitations of JAWS + Internet Explorer and Narrator + Edge. If both of those browsers supported CSS-generated content, there would be no need to provide a text alternative.

It gets a little complicated because some screen readers do support CSS-generated content. To take all scenarios into account, developers should hide the generated text from all screen readers using aria-hidden="true" and provide a text alternative some other way, such as **via aria-label, if the item is a link, button, form control, or other focusable item. If it is not a focusable item, it may be necessary to use a technique such as CSS hidden text** (using position:absolute; clip:rect(0 0 0 0)).

(I imagine that the same applies to `aria-labelledby`)

## `aria-label` and `aria-labelledby` are supposed to override the HTML element content text (or associated `label`, or `alt` attribute). But in practice, some screen readers will read both.

Like aria-label, the text referenced by aria-labelledby is supposed to replace the original text of the element. Don't use aria-labelledby to provide supplemental information in addition to the text that's already there, because that's not what it will do in most circumstances. The aria-describedby attribute would be more appropriate for that purpose.

As with aria-label, screen reader behavior is not entirely consistent, so in some cases the screen reader will read both the original text and the aria-labelledby text, but don't count on that happening.