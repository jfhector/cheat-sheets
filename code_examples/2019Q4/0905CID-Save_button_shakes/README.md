# 0905CID-Save_button_shakes

[See it live](https://jfhector.github.io/cheat-sheets/code_examples/2019Q4/0905CID-Save_button_shakes/index.html)

## What does it demonstrate?

### Starting an animation after 5 seconds unless something happens

This could be useful to remind someone to save a draft, after they've typed, if they haven't pressed any key for 5 seconds.

```
var timeout = null;

document.documentElement.addEventListener('keyup', () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        button.classList.add('shake');
    }, 5000);
});
```

### Listening to the `animationend` event to removing an animation class

```
button.addEventListener('animationend', () => {
    button.classList.remove('shake');
});
```

### Creating a shaking animation

```
.shake {
  animation-name: shake;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
}

@keyframes shake {
  0%, 100% {
    transform: none;
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateY(0.2em);
  }
  20%, 40%, 60%, 80% {
    transform: translateY(-0.2em);
  }
```

## Notes

* Listen to `animationend` events on an element to remove an animation class from it.
* To trigger a function only in there's no interaction for a period of time:
  1. declare a variable for a time out
  2. then in the event handler:
     1. first clear the timeout variable
     2. ... just before setting a timeout again
