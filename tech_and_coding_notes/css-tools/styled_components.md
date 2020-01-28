# Styled components

## Styled components and typescript

### Default props of components generated using the `styled` function

See this [thread](https://stackoverflow.com/questions/52226596/styled-components-defaultprops).

## Media queries

```js
import { css } from 'styled-components'
const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376,
}
// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})
```
```
const Container = styled.div`
  color: #333;
  ${media.desktop`padding: 0 20px;`}
  ${media.tablet`padding: 0 10px;`}
  ${media.phone`padding: 0 5px;`}
`
```
