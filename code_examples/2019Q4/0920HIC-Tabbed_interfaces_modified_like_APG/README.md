# 0920HIC-Tabbed_interfaces_modified_like_APG

[See it live](https://jfhector.github.io/cheat-sheets/code_examples/2019Q4/0920HIC-Tabbed_interfaces_modified_like_APG/public/index.html)


## Snapshots

<figure>
  <figcaption>The component on a large viewport when JS is available looks like a regular tabbed interface.</figcaption>
  <img src="./snapshots/s01.png">
</figure>

<figure>
  <figcaption>The component on a narrow viewport when JS is available looks like a tabble of content.</figcaption>
  <img src="./snapshots/s02.png">
</figure>

<figure>
  <figcaption>The component when JS is not available looks like a tabble of content.</figcaption>
  <img src="./snapshots/s03.png">
</figure>

## What does it demonstrate?

* How to create a progressively enhanced tabbed interface, that is just a table of content is JS isn't available or if the viewport is narrow.
* How to use `matchMedia` to conditionally run JS code based on a media query. And the watch out that `matchMedia` only works well with pixel units (rather than `rem` for example).

## Possible improvements

* The ids are not name spaced. They might clash. E.g. `section-1-tab`, `section-1-panel`.
* Check arrow navigation when VoiceOver is on

## Notes

### How to create a progressively enhanced tabbed interface, that is just a table of content is JS isn't available or if the viewport is narrow.

#### The markup is that of a table of content.

* The content of each `section` is wrapped in a `section` element.
* Each link in the table of content points to a section.
* Each section (the future panels) is `aria-labelledby` the link that points to it.
* The markup doesn't have any of the aria attributes or roles before progressive enhancement

```html
<div class="tab-interface" data-module="tab-interface">
    <div class="tab-interface__toc-container">
        <h2 id="toc-heading">Table of contents</h2>
    
        <ul aria-labelledby="toc-heading">
            <li><a href="#section-1-panel" id="section-1-tab">Section 1</a></li>
            <li><a href="#section-2-panel" id="section-2-tab">Section 2</a></li>
            <li><a href="#section-3-panel" id="section-3-tab">Section 3</a></li>
            <li><a href="#section-4-panel" id="section-4-tab">Section 4</a></li>
        </ul>
    </div>

    <section id="section-1-panel" aria-labelledby="section-1-tab">
        <h2>Section 1</h2>
        <p>Some content content content content content content content content content content content content content content contentcontent</p>
        <p>Some content <a href="">content content</a> content content content content content content content content content content content contentcontent</p>
    </section>

    <section id="section-2-panel" aria-labelledby="section-2-tab">
        <h2>Section 2</h2>
        <p>Some content content content content content content content content content content content content content content contentcontent</p>    
        <p>Some content <a href="">content content</a> content content content content content content content content content content content contentcontent</p>
    </section>

    <section id="section-3-panel" aria-labelledby="section-3-tab">
        <h2>Section 3</h2>
        <p>Some content content content content content content content content content content content content content content contentcontent</p>
        <p>Some content <a href="">content content</a> content content content content content content content content content content content contentcontent</p>
    </section>

    <section id="section-4-panel" aria-labelledby="section-4-tab">
        <h2>Section 4</h2>
        <p>Some content content content content content content content content content content content content content content contentcontent</p>
        <p>Some content <a href="">content content</a> content content content content content content content content content content content contentcontent</p>
    </section>
</div>
```

#### The markup then gets progressively enhanced if JS is available and the viewport is wide.

* `matchMedia` is used to detect whether the viewport is larger than a threshold (the same threshold that is used in the CSS media query)
  * BROWSER SUPPORT/BUG: Safari (and maybe others) don't support matchMedia well if the value is not in pixels

```js
let mql = matchMedia('(min-width: 600px)');

const tabInterfaces = document.querySelectorAll('[data-module="tab-interface"]');
Array.prototype.forEach.call(tabInterfaces, ($tabInterface) => {
    
  if (mql.matches) {

    /* Everything */

  }
}
```

* Augment the markup to that of a tabbed interface

```js
$tabList.setAttribute('role', 'tablist');

Array.prototype.forEach.call(listItems, $listItem => $listItem.setAttribute('role', 'presentation'));

Array.prototype.forEach.call(tabs, ($tab, index) => {
    $tab.setAttribute('role', 'tab');
    $tab.setAttribute('aria-controls', `section-${index + 1}-panel`);
    
    // Add 'aria-selected', set to false, except for the first one
    $tab.setAttribute('aria-selected', false);
    tabs[0].setAttribute('aria-selected', true);

    // Set tabindex="-1" on all except the first one
    $tab.setAttribute('tabindex', -1);
    tabs[0].removeAttribute('tabindex');
});

Array.prototype.forEach.call(tabPanels, $tabPanel => {
    $tabPanel.setAttribute('role', 'tabpanel');
    
    // Hide all, except the first one
    $tabPanel.hidden = true;
    tabPanels[0].hidden = false;
});
```

* Define a `selectTab($tabToSelect)` function, that 
  * sets up the updated `tabindex` and `aria-selected` attributes on the tabs
  * focuses the tab to select
  * and the `tab-index` and `hidden` attributes on the tab panels.

```js
function selectTab($tabToSelect) {
    // Set tabindex="-1" on all tabs, except on $tabToSelect, where tabindex needs to be removed
    // Set aria-selected to false on all tabs, except on $tabToSelect, where it needs to be true
    Array.prototype.forEach.call(tabs, $tab => {
        $tab.setAttribute('tabindex', -1);
        $tab.setAttribute('aria-selected', false);
    });
    $tabToSelect.removeAttribute('tabindex');
    $tabToSelect.setAttribute('aria-selected', true);

    // Focus on $tabToSelect
    $tabToSelect.focus();

    // Remove the tabindex attribute on all tabPanels, except the one that corresponds to $tabToSelect, which takes tabindex="0"
    // Add hidden on all tabPanels, except the one that corresponds to $tabToSelect, which gets hidden=false
    Array.prototype.forEach.call(tabPanels, ($tabPanel) => {
        $tabPanel.removeAttribute('tabindex');
        $tabPanel.hidden = true;
    });

    const idOfTabPanelControlledByTheTabToSelect = $tabToSelect.getAttribute('aria-controls');
    const tabPanelControlledByTheTabToSelect = document.getElementById(idOfTabPanelControlledByTheTabToSelect);
    tabPanelControlledByTheTabToSelect.setAttribute('tabindex', 0);
    tabPanelControlledByTheTabToSelect.hidden = false;
}
```

* On keyup events on tabs, define the value of `$tabToSelectNext`, and call `selectTab($tabToSelectNext)`

```js
$tab.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {

        // Note: we are following the automatic selection pattern
        let $tabToSelectNext;

        // if key code is ArrowLeft
        if (e.code === 'ArrowLeft') {
            // if tab is firstElementChild: nextSelectedTab is the last one
            // if not, nextSelectedTab is the previous one
            if (index === 0) {
                $tabToSelectNext = tabs[(tabs.length - 1)];
            } else {
                $tabToSelectNext = tabs[(index - 1)];
            }
        }

        // if key code is ArrowRight
        if (e.code === 'ArrowRight') {
            // if tab if lastElementChild: nextSelectedTab is the first one
            // if not, nextSelectedTab is the next one
            if (index === (tabs.length - 1)) {
                $tabToSelectNext = tabs[0];
            } else {
                $tabToSelectNext = tabs[(index + 1)];
            }
        }
        if ($tabToSelectNext) {
            selectTab($tabToSelectNext);
        }

        // !!!! how to find an index from a NodeList using indexOf!!!!!!
        // Note: instead of getting the index from forEach, I could I got it from:
        // const index = Array.prototype.indexOf.call(tabs, e.currentTarget);
    }
});
```

### Using `$==""` in the attribute selector, to select all elements that match based on the end of a string

Eg 

```html
<section id="section-1-panel" aria-labelledby="section-1-tab">
    ...
</section>

<section id="section-2-panel" aria-labelledby="section-2-tab">
    ...
</section>

<section id="section-3-panel" aria-labelledby="section-3-tab">
    ...
</section>

<section id="section-4-panel" aria-labelledby="section-4-tab">
    ...
</section>
```

```js
const tabPanels = $tabInterface.querySelectorAll('section[id$="-panel"]');
```