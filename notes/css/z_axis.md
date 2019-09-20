# Z axis

* `z-index` only has effect on absolutely-positioned elements.
* Positioned elements (e.g. `position: absolute`, `relative`) are painted on a different layer, above static elements. By default (i.e. if `z-index` hasn't been used to modified this), their order within positioned elements on the z axis comes from the source order. [Example](./../../code_examples/2019-09-05_CSS-IN-DEPTH_Modal-and-dropdown-positioning-and-z-index)
