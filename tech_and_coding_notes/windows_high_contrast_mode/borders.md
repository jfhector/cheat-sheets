# Windows High-Contrast Mode and borders

## If I'm enhancing focus indicators, include borders (even if `transparent`) to focus indicators

In Edge and Internet Explorer, if the visual focus indicator's outline width is enhanced and is set to display a solid line, a solid line with the outline's width will be displayed in high contrast mode. However, if the high contrast theme has a black background, the visual focus indicator will become a white solid line. If the background is white, the visual focus indicator becomes a black solid line.

**It's best practice to include a border or an outline as a part of the enhanced focus indicator**, because **Windows High Contrast Mode retains borders and outlines, but suppresses background colors.**

If the visual focus indicator isn't enhanced and the default settings are used for the focus indicator in Edge and IE, the visual focus indicator will be displayed as a dashed line around focusable elements.