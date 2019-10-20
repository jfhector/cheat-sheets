# `display: none;` and `visibility: hidden;`

Content will be hidden from screen reader users (and all sighted users too) when display:none or visibility:hidden are used. Changing those values to display:block, display:inline, or other display or visibility options will make the items available to screen reader users.

Note: `opacity: 0` doesn't have content from screen reader users. A long time ago there was a bug in one of the screen readers, but now it's fixed. Today Scott O'Hara uses `opacity: 0;`, and doesn't bother with hacks like `opacity: 0.000001;`.