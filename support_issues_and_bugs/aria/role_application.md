# Support issues with `role="application"`

From the [Using ARIA doc](https://www.w3.org/TR/using-aria/#using-application).

On many popular screen readers today, most keystrokes are captured by the screen reader and not the web page when the user is in browse mode. This is necessary for efficient navigation of a page. As of this writing, when application mode is set, many screen readers stop intercepting keystrokes, and pass all keystrokes directly to the browser. Then the user won't be able to navigate the page as easily. For instance they won't be able to skip around the page by headings or read a paragraph of static text line-by-line. 

**However, several screen readers do not behave differently when there is an application role set.**

