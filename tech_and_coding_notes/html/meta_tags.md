# HTML `meta` tags

## `<meta name="viewport" content="  ...  ">` tag

Do this to make sure that:
1. The right amount of pixels' worth of content gets displayed on mobile devices, corresponding to the device width in logical pixels (density independent pixels), abstracting out the device's width in physical pixels
2. Users can pinch to zoom content

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Background knowledge: The Default Shrink-to-Fit Display Width

To accommodate the wide designs of web sites designed for desktop/laptop screens, mobile devices set a default display width, which is 980 pixels on the iPhone. This means that if the web developer does not specify any device-specific viewport settings, the iPhone will render the design at 980 pixels wide, then shrink the design to fit within the screen's viewport.

In most cases, the layout of the resulting page looks as it would on a desktop/laptop, which is nice, but after the shrink-to-fit feature has been applied, the design is too small for most users to read, forcing them to zoom in on the page. After zooming, the users may need to swipe or scroll horizontally as well as vertically. The zoomed page isn't optimized for the device dimensions, but at least it is readable.

## Do not do this:

Note: With iOS 10, Safari now ignores attempts to disable zoom with the meta viewport properties.

### Do not disable pinch-to-zoom

The pinch-to-zoom feature must not be disabled.

Do not do this:

```html
<meta name="viewport" content="user-scalable=no">
```

### Do not set `maximum-scale` (or at least not to anything below 2.0)

To not do this:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" >
```