# SCSS @extend

## When to use `@extend`, when when to use two class names

See [example here](./../../../code_examples/2019Q4/1011WTFF-Checkbox_Radio_Select_Progress).

`@extend` helps me avoid adding ancestor classes in HTML:

Because I've done this:

```scss
.Checkbox {
    @extend .control;
}
```

... I don't need to do this any more:

```tsx
<label className='control Checkbox'>
```

... I can do just this:

```tsx
<label className='Checkbox'>
```

So, what about when I use a modifier?

i.e. I could use `@extend` further to do this:

```tsx
<label className={classNames({'Checkbox': !inline, 'Checkbox--inline': inline})}>
```

But that seems too complicated, and counter intuitive.

So instead, I do:

```tsx
<label className={classNames('Checkbox', {'Checkbox--inline': inline})}>
```

In summary, I use `@extend` to avoid having to assign classes for (abstract) parents of the CSS component I want.
But I don't use it for modifiers (I use two CSS classes instead).