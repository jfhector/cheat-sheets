# SVGs in Windows High Contrast Mode

SVG images will retain their colors when the user switches into Windows High Contrast Mode.

Some SVG images will naturally look fine in Windows High Contrast Mode, so there is no need to create specific styles for them. In other cases, SVG images will not have the proper contrast in comparison with the background. This is especially true when CSS is used to style SVG image components. Windows High Contrast Mode overrides CSS colors, which can drastically change the look of the image (as well as the entire page around the image).

If the SVG image is problematic in Windows High Contrast Mode, one solution is to detect when Windows High Contrast Mode is being used and customize the styling of the SVG image accordingly. There are two basic approaches to detecting Windows High Contrast Mode.