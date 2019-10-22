# HTML `strong` and `em` elements

## Issue

All major screen readers ignore both the <em> and the <strong> elements, at least in their default configuration. Some (but not all) screen readers allow users to change the settings so that the <em> and the <strong> elements are acknowledged by the screen reader. If users have the right screen reader, and if they are savvy enough to know that the setting exists, and if they change the setting, they will benefit from <em> and <strong>, but you can't count on that for the vast majority of users.

Deque WAS course

## Solution

Critical emphasis in the text SHOULD be conveyed in a text-based format.

### Option 1: Add Visible Text

```html
<p>Important: You cannot undo. Your file will be permanently deleted.</p>
```

### Option 2: Add invisible text

```html
<p><span class="visually-hidden">Important:</span>
You cannot undo. Your file will be permanently deleted.</p>
```

### Option 3: Add an Image with Appropriate Alt Text

```html
<img src="warning.png" alt="Warning"> 
    You cannot undo. Your file will be permanently deleted.</p>
```