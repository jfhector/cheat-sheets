# Detecting Windows High Contrast Mode

## Via media query

```css
/* Styles for all high contrast modes: */
@media screen and (-ms-high-contrast: active) { }

/* Styles for the Windows "High Contrast Black" theme: */
@media screen and (-ms-high-contrast: white-on-black) { }

/* Styles for the windows "High Contrast White" theme: */
@media screen and (-ms-high-contrast: black-on-white) { }
```

## Via JavaScript (works for any user-initiated changes of colour and other high-contrast features, not just WHCM)

[Windows High Contrast Mode detection script by Hans Hillen](http://jsfiddle.net/karlgroves/XR8Su/6/)
[Explanation of the script's methods and philosophy](http://hanshillen.github.io/HCMDS/hcmode_detection.html)

