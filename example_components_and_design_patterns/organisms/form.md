# Form

## TenonUI form and components

https://www.tenon-ui.info/forms-full-demo

## Error handling best practices

* For screen reader users, inline validation error messages can be tricky, and in many cases are not effective, but as long as the inline validation is designed well, there is generally no harm, even though screen reader users won't experience the error messages until after submitting the form (unless they navigate backward in the form to the fields with errors).

* It's important to note that screen reader users often explore forms by tabbing through them, prior to filling out any part of the form. If they do this, tabbing into and out of a required field without typing some content into the field can trigger the inline validation. For example, the user may be presented with an error message saying "Error: field cannot be empty." When the user goes back through the form, the presence of error messages may be confusing to the user. That said, you have to balance the positive aspects of inline feedback with the drawbacks for screen reader users.