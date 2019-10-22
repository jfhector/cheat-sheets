# SVG attributes on `svg` elements

Interactive `<svg>` objects MUST communicate the applicable name, role, and value of controls, events, and semantic elements within the `<svg>` object.

In essence, interactive <svg> objects must abide by the same types of accessibility principles that govern the use of custom ARIA widgets. In fact, an interactive <svg> object may be coded as a custom ARIA widget. Roles like button, checkbox, tablist, and others can be added to elements within ARIA widgets.

That said, support for interactive SVG, even when combined with ARIA, is sometimes spotty and must be tested thoroughly with screen readers before going live.

