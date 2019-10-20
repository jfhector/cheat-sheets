# aria-describedby support and bugs

## Issue: Not supported on `fieldset` and `legend`

Attaching aria-describedby to <fieldset> or <legend> is not supported in many screen readers
Source: Almero Steyn, mid 2009

### Solutions

#### Add text to the `legend`

 Eg inside an additional `span` within the `legend`.

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

#### If I don't want your error texts next to your legends:

##### Visually hide the extra text in the legend, and add the same where I want with `aria-hidden='true'`

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

##### Move the extra text with CSS

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