# Table

## See recommended markup and watchout in the Deque WAS course

Go there.

## Labelling a table

### Requirements

* Data tables SHOULD have a programmatically-associated caption or name.
* The name/caption of each data table SHOULD be unique within the context of other tables on the same page.

###  Related screen reader bugs/support:

* Placing the visually-hidden class directly on the <caption> tag causes the NVDA screen reader to read the table with an incorrect number of rows.

### Correct implementation examples

#### Example: using a proper caption and visible text

```html
<table>
  <caption>1st Quarter Results</caption>
  ...
</table>
```

#### Example: using visually-hidden text

```html
<table>
  <caption><span class="visually-hidden">1st Quarter Results</span></caption>
  ...
</table>
```

#### Example: using `aria-label`

But `aria-label` values are not translated by most browsers. So using the other methods is better.

```html
<table aria-label="Second quarter Results">
  ...
</table>
```

#### Example: using `aria-labelledby`

```html
<h3 id="tableCaption">Third Quarter Results</h3>
<table aria-labelledby="tableCaption">
  ...
</table>
```

#### Example: With the table inside a `figure` element, using `aria-labelledby` pointing to the `figcaption`

```html
<figure>
   <figcaption id="table_figcaption">
      Greensprings Running Club Personal Bests<br>
      (The first column lists the runners and the
      first row lists the race distances)
   </figcaption>

  <table aria-labelledby="table_figcaption">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">1 mile</th>
      <th scope="col">5 km</th>
      <th scope="col">10 km</th>
      </tr>
    <tr>
      <th scope="row">Mary</th>
      <td>8:32</td>
      <td>28:04</td>
      <td>1:01:16</td>
      </tr>
    <tr>
      <th scope="row">Betsy</th>
      <td>7:43</td>
      <td>26:47</td>
      <td>55:38</td>
      </tr>
    <tr>
      <th scope="row">Matt</th>
      <td>7:55</td>
      <td>27:29</td>
      <td>57:04</td>
      </tr>
    <tr>
      <th scope="row">Todd</th>
      <td>7:01</td>
      <td>24:21</td>
      <td>50:35</td>
      </tr>
  </table>
<figure>
```