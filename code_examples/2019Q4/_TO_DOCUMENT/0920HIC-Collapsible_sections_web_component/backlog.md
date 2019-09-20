# Backlog

## Still to do

## Questions

* How to scope the `section-toggle` element itself?
  * Heydon just used styles in the Light Dom. This isn't ideal because my component isn't as plug and play. But is that a problem? (ACTUALLY IT'S FINE)
    * The things I need to style the component externally for, are things that use the owl seletor (margin, maybe border even). That's fine. That's how it should be used.
    * So, yes, when I deliver a web component, it might need to come with a bit of style on top.
      * Or I could just wrap my whole shadowContent in a div, which I can style!
      * Maybe I can wrap that it another web component, to style these things together.
      * OR I could avoid using the shadowDom.
    * So this is just like a normal CSS-module type react component
  * My own attempt to use :root didn't work.

## Out of scope

* Attributes/properties reflection

