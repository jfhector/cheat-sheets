# ARIA support / bugs

## aria-describedby

### Not supported on `fieldset` and `legend`

Attaching aria-describedby to <fieldset> or <legend> is not supported in many screen readers
Source: Almero Steyn, mid 2009

#### Solutions

##### Add text to the `legend`

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

##### If I don't want your error texts next to your legends:

###### Visually hide the extra text in the legend, and add the same where I want with `aria-hidden='true'`

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

###### Move the extra text with CSS



