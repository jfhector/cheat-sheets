# Skip link

## Important note: the target element needs to be focusable or have tab-index="-1"

Some browsers, such as Safari, require the link destination to either be natively focusable (such as a link, button, or form element), or have a tabindex value to function correctly. If the link is not focusable and does not have a tabindex value, the viewport will scroll down to the appropriate place, but when the user presses the tab key, the focus will jump back up to the next link after the "skip navigation" link, when it should jump to the next link after the destination.

## Considerations

* The target item should have a `tabindex` if it's not a focusable element
* The "skip link" SHOULD be the first focusable element on the page.
* A skip link MUST be either visible at all times or visible on keyboard focus.
  * Do NOT use display:none to hide "skip navigation" links, because that will make them unavailable to keyboard users, including screen reader users.

## Example

```html
<head>
  <title>Museum Information</title>
  <style>
    .skipnav a {
      position: absolute;
      clip: rect(0 0 0 0);
      border: 0;
      height: 1px; margin: -1px;
      overflow: hidden;
      padding: 0
      width: 1px;
      white-space: nowrap;
    }
    
    .skipnav a:focus {
      clip:auto;
      left:0;
      top:0;
      width:100%;
      height:auto;
      margin:0;
      padding:10px 0;
      background:#fdf6e7;
      border:2px solid #990000;
      border-left:none;
      border-right:none;
      text-align:center;
      font-weight:bold;
      color:#990000;
    }
  </style>
</head>

<body>
  <div class="skipnav"><a href="#mainContent">Skip navigation</a></div>
  <!-- document banner, navigation, etc. -->

  <main id="mainContent" tabindex="-1">
      <h1>Link will take users to this location.</h1>
      <!-- other content in the main content -->
  </main>
  <!-- other content on the web page -->

</body>
```
