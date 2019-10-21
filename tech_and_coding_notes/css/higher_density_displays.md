# Higher density displays

## They interpolate CSS units automatically

### Quote

Eg Deque WAS course on touch target areas:

On web pages:
Set the width to at least 44px in the CSS (Android's 48px layout grid is less relevant on the web, but it doesn't hurt to make touch targets larger). Standard resolution devices will render it at 44px and double density devices will interpolate the value and render it at the equivalent of 44px, even though the actual value will be 88px.

### Other quote

An iPhone 6 Plus, for example, has an actual pixel width of 828, but because of the interpolation, web designers can treat it as a device with a width of 414 pixels.

High-resolution devices interpolate the value to make web pages look normal. The interpolation works well, especially for fonts and vector graphics.

Deque WAS course

## What about image asset choice using srcset?

### From Deque WAS course

The interpolation also works with raster graphics (PNG, JPG, GIF), but high-resolution screens expose the low resolution of the original images, making them look more jagged or blurrier. The double pixel density means that raster graphics on Retina devices look best when they are designed at twice the resolution of graphics for regular monitors, then resized by the web page to their intended dimensions.

### From CSS-In-Depth book

See CSS-In-Depth

### See Jake Archibalk article

and also another article I've found and store somewhere (I think by Jake Archibald) that explains it.

