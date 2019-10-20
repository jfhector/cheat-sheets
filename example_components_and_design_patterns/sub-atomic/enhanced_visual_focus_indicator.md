# Enhanced visual focus indicator

## What to apply it to

### Deque's partial list

* links — a:focus {...}
* buttons — button:focus {...}
* inputs — note that a single style may be sufficient for all inputs, depending on the design (e.g. input:focus {...}, but the styles can also be specified for individual inputs:
  * text inputs — input[type=text]:focus {...}
  * image inputs — input[type=image]:focus {...}
  * submit buttons — input[type=submit]:focus {...}
  * radio buttons — input[type=radio]:focus {...}
  * All other input types
* checkboxes — input[type=checkbox]:focus {...}
* drop-down selection inputs — select:focus {...}
* textarea fields — textarea:focus {...}
* ARIA controls:
  * ARIA links — [role=link]:focus {...}
  * ARIA buttons — [role=button]:focus {...}
  * ARIA inputs — [role=radio], [role=checkbox], etc.
  * ARIA tabs — [role=tab]:focus {...}
  * All other focusable custom ARIA controls
* All other focusable items

