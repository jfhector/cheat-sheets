# tsconfig options

## Definitely stay with `stictNullChecks` and `noImplicitAny`, even if I need to add types (and type checks) to a 3rd party component from my team

It was a nightmare to not have these scrit parameters when I used the subcategory selector internals from dunnhumby.

In the end, I added whatever coded I needed to my copy of the dh files to be able to turn on the strict compiler features, and it worked.

I think that I would have been better off creating my own components from scratch.

## I can also use `noImplicitThis` and `noImplicitReturn`

