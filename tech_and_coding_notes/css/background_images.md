# CSS background images

## Try not to use CSS background images for presenting informational images

* Try to avoid presenting informational images in CSS backgrounds. If your image contains important information for the end user, then it should be provided in an HTML <img> tag with proper alt text.

* Definitely do not use background images on elements that have content, because the only way to add an accessible name to the element with a background image would override the element's content for screen reader users.

## To remediate

### I can only remediate if the element with background image doesn't have content

If the `<div>` tag has any content inside it, then a `role="img"` and `aria-label` could obscure the inside content because of the accessible name calculation, or the assistive technology might just ignore the `aria-label`.

So do not put the CSS background image inside a `<div>` that contains any content. It's best to use an empty `<span>` and an `aria-label` with `role="img"`.

### Add `role="img"` and `aria-label` to remediate

Do this:

```html
<div>
<span class="background-image" role="img" aria-label="[place alt text here]"> </span>
[all the rest of my content]
</div>
```

Don't do this:

```html
<div class="background-image" role="img" aria-label="blah blah blah">
[all the rest of my content]
</div>
```

### What If the Author Has to Have a CSS Image on a <div> that Contains Content?

Sometimes there are dependencies in the CSS stack and messing with it can upset the design and layout of the site, or a request to change the code could get hung up in approval from various stakeholders. In cases where the author has to have the background image in the `<div>` that wraps up other content, then here is a fallback.

````html
<div class="background-image" >
<span role="img" aria-label="[place alt text here]"> </span>
[all the rest of my content]
</div>
```

This is a hack because semantically the alternate text is not on the element that actually has the image. However, from a screen reader perspective the `<div>` with the background image is ignored and so placing the `<span>` directly following it will provide that information in a way that will seem as if the alternate text was in the same place as the background image.