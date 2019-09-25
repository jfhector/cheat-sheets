# CSS questions to resolve

## About `position: sticky;`

## Should overflow be set to hidden / visible for sticky to work?

In the past yes (see MDN docs for position). Now, it seems to work in Chrome without it

## Can I get different sticky components to 'push' each other out of view?

I don't know how.

It's not as simple as setting different elements to sticky and hope that they'll push each other out of their position (they don't, they overlap each other instead).

See video ref in `_assets` folder: `how sticky elements dont push each other`
