# Description or definition list

The ARIA definition role is not particularly common, and screen reader support is not yet robust for this role, but when supported, it can mark a section of text as a definition. Note that HTML already provides a definition list <dl> structure which has better screen reader support than the definition role, so it would be better to use a definition list rather than ARIA.

```html
<ol>   
  <li id="note-anomie">
    <span role="definition">
      <strong>Anomie:</strong> 
      social instability resulting from a breakdown of standards and values
    </span>
  </li>
  <li id="note-solipsism">
    <span role="definition">
      <strong>Solipsism:</strong><br>
      A) a theory in philosophy that your own existence is the only 
      thing that is real or that can be known, or<br>
      B) extreme egocentrism
    </span>
 </li> 
</ol>
```

It's better to do this:

```html
<dl>
    <dt id="anomie-dt">anomie</dt>
    <dd role="definition" aria-labelledby="anomie-dt">
        social instability resulting from a breakdown of standards and values
    </dd>
    <dt id="solipsism-dt">solipsism</dt>
    <dd role="definition" aria-labelledby="solipsism-dt">
        A) a theory in philosophy that your own existence is the only
        thing that is real or that can be known, or<br>
        B) extreme egocentrism
    </dd>
</dl>
```

Note that, if I hadn't added `role="definition"`, the `dd`s would have been announced as 'description'. With `role="definition"`, they are announced as 'definition'.

Note also that using `aria-labelledby` on the `dd` improves the user experience of the `dd`: it will announce the `dt` before reading the `dd`.
