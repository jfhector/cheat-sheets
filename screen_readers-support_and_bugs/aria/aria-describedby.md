# aria-describedby support and bugs

## Issue: Not supported on `fieldset` and `legend`

Attaching aria-describedby to `<fieldset>` or `<legend>` is not supported in many screen readers.
Adding aria-describedby to either the `<fieldset>` or `<legend>` element doesn't work.
Sources:
* Almero Steyn, mid 2009
* [Deque WAS course](https://dequeuniversity.com/class/forms2/instructions/forms-groups-sections), October 2019

### Solutions

#### Option 1: Add text to the `legend`

Add the instructions to the <legend>. If the instructions are short, adding them to the <legend> is easy and unobtrusive. Some screen readers read the full <legend> text on every form field, though, so if the instructions are long, it can be annoying to hear them repeated over and over. In some ways, this is not semantically ideal, because the instructions are not the name of the group, but this method works, so it can be an acceptable workaround.

##### Eg inside an additional `span` within the `legend`.

```html
 <fieldset>
    <legend>
        <span>Choose your favourite time of day</span>
        <span>You have not chosen a favourite time</span>
    </legend>
    
    <input id="rMorning" type="radio" name="favTime" value="morning">
    <label for="rMorning">Morning</label>
    <input id="rNoon" type="radio" name="favTime" value="noon">
    <label for="rNoon">Noon</label>
</fieldset>   
```

##### Eg 'Required'

```html
<fieldset>
<legend>Login Information (Required)</legend>
  <label for="username">Username: </label> 
  <input type="text" id="username"></p>
  <label for="password">Password: </label> 
  <input type="password" id="password"></p>
</fieldset>
```

#### Option 2: Associate the instructions with one of the fields (usually the first field is best) within the group, using `aria-describedby`

This way, the group instructions will be read only once, and they will not be skipped over by screen reader users if they're tabbing to focusable elements.

##### E.g.

```html
<fieldset>
<legend>Create Account</legend>
  <p><label for="username">Username: </label> 
    <input type="text" id="username"></p>
  <p id="mustmatch">Password fields must match</p>
  <p><label for="password">Password: </label> 
    <input type="password" id="password" aria-describedby="mustmatch"></p>
  <p><label for="password2">Re-enter password: </label> 
    <input type="password" id="password2"></p>
</fieldset>
```

#### Option 3: Associate the instructions with all of the relevant fields, using `aria-describedby`

It's usually best to associate instructions with either the group or only one form field, but sometimes it can be appropriate to associate the same instructions with multiple form fields.

##### Example

In this example, the phrase "must not contain spaces" is associated with both the username and password fields. Note that the full instructions ("Username and password must not contain spaces") were not associated with each field, because that would have been too redundant.

```html
<fieldset>
<legend>Create Account</legend>
  <p><strong>Username and password <span id="mustnot">must not contain spaces</span></strong></p>
  <p>
    <label for="username">Username:</label> 
    <input type="text" id="username" aria-describedby="mustnot">
  </p>
  <p>
    <label for="password">Password:</label> 
    <input type="password" id="password" aria-describedby="mustnot">
  </p>
</fieldset>
```

#### Option 4: Put the instructions before the start of the whole form, as regular text not associated with anything, and hope that screen reader users read them before jumping in to form mode. 

This option sidesteps the whole problem and puts the burden on the user, which is not ideal. Still, you could make a case that the text is available to them this way, as long as they read through the document sequentially, which many users are likely to do anyway. Just don't put the text in the middle of the form unless you associate it with one of the inputs. Screen reader users are much more likely to skip over disassociated text.

#### Option 5: Visually hide the extra text in the legend, and add the same where I want with `aria-hidden='true'`

```html
<fieldset>
    <legend>
        <span>Choose your favourite time of day</span>
        <span class="visually-hidden">
            You have not chosen a favourite time
        </span>
    </legend>
    
    <input id="rMorning" type="radio" name="favTime" value="morning">
    <label for="rMorning">Morning</label>
    //...
    <span aria-hidden="true">
        You have not chosen a favourite time
    </span>
</fieldset>
```

#### Option 6: As option 2, but move the extra text with CSS, rather than repeating it

## Possible issue (tbc): lists within elements targeted via `aria-describedby` not (always) read out

I was just accessible this [example](https://dequeuniversity.com/class/images2/alt-text/complex) using macOS VoiceOver + Safari, and the list within the div below the image was omitted and skipped over.

```html
<p class="center"><img class="border" src="/assets/images/html_css/bar-chart.png" width="546" height="330" alt="Bar chart with percentages. Extended description below chart." aria-describedby="description-extended"></p>

<div id="description-extended" style="width:506px;max-width:90%;margin:auto;background:white;padding:20px;border:1px solid gray;"><p>Last year, Josephine kept track of the number of times she saw squirrels outside of the window while eating meals. She took this data and calculated the overall relative yearly percentage of meals with squirrel sightings on a monthly basis. The monthly proportion, or percentage, of squirrel sightings during meals over the course of the year is as follows:</p>
<ul>
  <li>January: 14%</li>
  <li>February: 10%</li>
  <li>March: 9%</li>
  <li>April: 18%</li>
  <li>May: 3%</li>
  <li>June: 1%</li>
  <li>July: 20%</li>
  <li>August: 14%</li>
  <li>September: 5%</li>
  <li>October: 1%</li>
  <li>November: 3%</li>
  <li>December: 2%</li>
</ul>
<p>Josephine apparently has more time on her hands to keep track of this kind of thing than the rest of us.</p>
</div>
```

### To do: test with another screen reader

[Test case](https://dequeuniversity.com/class/images2/alt-text/complex). Note: the `aria-describedby` attribute needs to be added to the image in this example.