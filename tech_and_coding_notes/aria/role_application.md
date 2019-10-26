# `role="application"`

## From 'Using ARIA'

Read the ['Using `role="application"`' section](https://www.w3.org/TR/using-aria/#using-application) in the 'Using ARIA' document for great guidance on:
* What `role="applicaton"` does
* How to use it, in the very rare cases that I might need it

### Summary

#### When to NOT use `role="application"`

##### You do not use role="application" if a set of controls only contains these widgets, that are all part of standard HTML. This also applies if you mark them up and create an interaction model using WAI-ARIA roles instead of standard HTML widgets:

* text box. This also applies to password, search, tel and other newer input type derivatives
* textarea
* check box
* button
* radio button (usually inside a fieldset/legend element wrapper)
* select + option(s)
* links, paragraphs, headings, and other elements that are classic/native to documents on the Web.

##### You also do not use the application role if your widget is one of the following more dynamic and non-native widgets.

Screen readers and other assistive technologies that support WAI-ARIA will support switching between browse and focus modes for these by default too:

* tree view
* slider
* table that has focusable items and is being navigated via the arrow keys, for example, a list of e-mail messages where you provide specific information. Other examples are interactive grids, tree grids, etc.
* A list of tabs (tab, tablist) where the user selects tabs via the left and right arrow keys. Remember that you have to implement the keyboard navigation model for this!
* dialog and alertdialog. These causes **some** screen readers to go into a sort of application mode (implicitly) once focus moves to a control inside them. 
* toolbar and toolbar buttons, menus and menu items, and similar.

##### It is not necessary to use role=application to have control-specific keyboard shortcuts while the user is in forms (focus) mode on their screen reader.

For instance, a custom control with ARIA `role=listbox` can easily capture all keys pressed including arrow keys, while the user is interacting with it.

#### You only want to use role=application if the content you’re providing consists of only focusable, interactive controls, and of those, mostly advanced widgets that emulate a real desktop application.

Note that, despite many things now being called a web application, most of the content these web applications work with are still document-based information, be it Facebook posts and comments, blogs, Twitter feeds, or even accordions that show and hide certain types of information dynamically. We primarily still deal with documents on the web, even though they may have a desktop-ish feel to them on the surface.

In short: The times when you actually will use role=application will probably be very rare!

#### Where Do I Put role=application in the Rare Cases It Is Useful?

Put it on the closest containing element of your widget, for example, the parent `div` of your element that is your outer most widget element. If that outer `div` wraps only widgets that need the application interaction model, this will make sure focus mode is switched off once the user tabs out of this widget.

Only put it on the body element if your page consists solely of a widget or set of widgets that all need the focus mode to be turned on. If you have a majority of these widgets, but also have something you want the user to browse, use `role=document` on the outermost element of this document-ish part of the page. It is the counterpart to `role=application` and will allow you to tell the screen reader to use browse mode for this part. Also make this element tabbable by setting a `tabindex=0` on it so the user has a chance to reach it.

As a rule of thumb: If your page consists of over 90 or even 95 percent of widgets, `role=application` may be appropriate. Even then, find someone knowledgeable who can actually test two versions of this: One with and one without `role=application` set to see which model works best.

NEVER put `role=application` on a widely containing element such as body if your page consists mostly of traditional widgets or page elements such as links that the user does not have to interact with in focus mode. This will cause huge headaches for any assistive technology user trying to use your site/application.
