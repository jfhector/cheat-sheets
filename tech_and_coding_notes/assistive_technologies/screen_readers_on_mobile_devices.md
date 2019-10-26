# Screen readers on mobile devices

At the most basic level, assistive technology on touchscreens offers sequential access to move the focus - essentially equivalent to moving the accessible cursor right/left in document mode on a desktop/keyboard 
device.

In addition, ATs on these devices can generally be switched to only navigate through certain types of content (navigate sequentially between headings, links, form controls, etc). These interactions do not 
fire any keydown/keypress events, but simply move the current focus (so focus/blur events are sent).

And of course, they offer an interaction (generally double-tap) to then activate/trigger whatever currently has focus - equivalent to ENTER/SPACE. Again, no keycode is sent (at least from my last test a while ago, if I recall correctly), but a click event is fired.

Already with this basic scenario, any specific code that listens to keyboard events instead of focus/blur/click will not work.

## Sources

* [WAI mailing list](https://lists.w3.org/Archives/Public/public-pfwg-comments/2015AprJun/0005.html)
