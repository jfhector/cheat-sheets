# Higher density displays

## They interpolate CSS units automatically

Eg Deque WAS course on touch target areas:

On web pages:
Set the width to at least 44px in the CSS (Android's 48px layout grid is less relevant on the web, but it doesn't hurt to make touch targets larger). Standard resolution devices will render it at 44px and double density devices will interpolate the value and render it at the equivalent of 44px, even though the actual value will be 88px.

## What about image asset choice using srcset?

See CSS-In-Depth, and also another article I've found and store somewhere (I think by Jake Archibald) that explains it.

