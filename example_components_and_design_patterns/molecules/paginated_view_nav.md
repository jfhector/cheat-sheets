# Paginated view navigation

## Requirements

* A paginated view SHOULD include a visible method of informing users which view is the currently active/visible view.
* A paginated view SHOULD include a method of informing blind users which view is the currently active/visible view.

## Example

```html
<head>
  <title>Search Results for &quot;screen readers&quot;</title>
  <style>
    .visually-hidden {
      position: absolute;
      clip: rect(0 0 0 0);
      border: 0;
      height: 1px; margin: -1px;
      overflow: hidden;
      padding: 0;
      width: 1px;
      white-space: nowrap;
    }
    li.current-page {
      outline: 1px solid red;
    }
  </style>
</head>
<body>

  ...
  
  <div class="page-navigation">Page
    <ul>
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li class="current-page">
        <span class="visually-hidden">Current page: </span>
        3
      </li>
      <li><a href="#">4</a></li>
    </ul>
  </div>
</body>
```