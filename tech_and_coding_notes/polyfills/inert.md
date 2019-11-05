# HTML `inert` polyfill

## Source

https://github.com/GoogleChrome/inert-polyfill

## Usage notes

When trying to use https://github.com/WICG/inert as the inert polyfill, I found that setting focus after closing the modal was not working because inert was not really removed yet when focus was being set. Here's a quote from the wing-inert README about the issue:

> It relies on mutation observers to detect the addition of the inert
attribute, and to detect dynamically added content within inert subtrees.
Testing for inert-ness in any way immediately after either type of mutation
will therefore give inconsistent results; please allow the current task to end
before relying on mutation-related changes to take effect, for example via
setTimeout(fn, 0) or Promise.resolve().

So I recommended:

> I think that setTimeout(fn, 0) should work.
The first answer to this Stack Overflow question explains what the technique does:
https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673

Ptrin tested and it worked just as well:

https://github.com/scottaohara/accessible_modal_window/pull/11