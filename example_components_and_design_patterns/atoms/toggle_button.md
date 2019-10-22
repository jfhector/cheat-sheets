# Toggle Button

The toggle state — the difference between selected and not selected — must be visually indicated in a way that does not rely on color alone. Users with low contrast vision, color-blindness, or other visual disabilities may not be able to discern the differences between colors.

Also, Windows High Contrast Mode will override text and background colors, rendering them useless as a way to distinguish the toggle states.

Methods that work visually include using an `<img>` element or a font icon in the CSS. In the implementation here, a checkmark icon is used in addition to the color change of blue to black when the button is selected.