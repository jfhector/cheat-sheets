# `role="document"`

If you have something you want the user to browse, use `role=document` on the outermost element of this document-ish part of the page. It is the counterpart to `role=application` and will allow you to tell the screen reader to use browse mode for this part. 

Also make this element tabbable by setting a `tabindex=0` on it so the user has a chance to reach it.

Source: [Using ARIA](https://www.w3.org/TR/using-aria/#using-application)