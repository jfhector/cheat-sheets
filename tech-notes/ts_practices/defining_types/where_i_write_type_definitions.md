# Where I write type definitions

## I define Prop and State types directly above React Components

```js
interface Props { ... }

interface State { ... }

export class MyComponent extends React.Component<Props, State> { ... }
```

## I define types of actions and ref assignment functions as part of their definition, and as part of the prop typing when they're passed as props

```js
interface Props {
    selected: {
        brand: SelectOption<CoffeeBrandValue | TeaBrandValue>
        category: CategoryOption<'Coffee' | 'Instant coffee'>
        analysisPeriod: keyof typeof analysisPeriodOptions
        comparisonPeriod: keyof typeof comparisonPeriodOptions
        region: keyof typeof regionOptions
        storeFormat: keyof typeof storeFormatOptions
    }
    handle: {
        select: {
            brand: (newlySelectedBrand: SelectOption<CoffeeBrandValue | TeaBrandValue>) => void,
            category: (newlySelectedCategory: CategoryOption<'Coffee' | 'Instant coffee'>['id']) => void,
            analysisPeriod: (newlySelectedAnalysisPeriod: keyof typeof analysisPeriodOptions) => void,
            comparisonPeriod: (newlySelectedComparisonPeriod: keyof typeof comparisonPeriodOptions) => void,
            region: (newlySelectedRegion: keyof typeof regionOptions) => void,
            storeFormat: (newlySelectedStoreFormat: keyof typeof storeFormatOptions) => void,
        }
    }
}
```

## If I need to manually write the type of some data, I do it just above the data itself

```js
// TYPES

export type CoffeeBrandValue =
    'Carte Noire' |
    'Douwe Egberts' |
    'Folgers' |
    'Illy' |
    'Jacobs' |
    'Kenco' |
    'Lavazza' |
    'Maxwell House' |
    'Moccona' |
    'Mount Hagen' |
    'Nescafé' |
    'Starbucks' |
    'Tasters Choice'

export type TeaBrandValue =
    'Lipton' |
    'PG Tips' |
    'Typhoo' |
    'Twinings'|
    'Clipper tea'


export type MeasureValue =
    'Sales value' |
    'Sales units' |
    'Share of category' |
    'Av. price per unit' |
    '% sold on promotion' |
    'Rate of sale' |
    'Stores selling'

export type SelectOption<T extends MeasureValue | CoffeeBrandValue | TeaBrandValue> = {
    label: string,
    value: T
}

// DATA

// brandOptions

export const brandOptions: SelectOption<CoffeeBrandValue | TeaBrandValue>[] = [
    {
        label: 'Carte Noire',
        value: 'Carte Noire'
    },
    {
        label: 'Clipper tea',
        value: 'Clipper tea'
    },
    {
        label: 'Douwe Egberts',
        value: 'Douwe Egberts'
    },    
    {
        label: 'Folgers',
        value: 'Folgers'
    },
    {
        label: 'Illy',
        value: 'Illy'
    },
    {
        label: 'Jacobs',
        value: 'Jacobs',
    },
    {
        label: 'Kenco',
        value: 'Kenco'
    },
    {
        label: 'Lavazza',
        value: 'Lavazza'
    },
    {
        label: 'Lipton',
        value: 'Lipton'
    },
    {
        label: 'Maxwell House',
        value: 'Maxwell House'
    },
    {
        label: 'Moccona',
        value: 'Moccona'
    },
    {
        label: 'Mount Hagen',
        value: 'Mount Hagen'
    },
    {
        label: 'Nescafé',
        value: 'Nescafé'
    },
    {
        label: 'PG Tips',
        value: 'PG Tips'
    },
    {
        label: 'Starbucks',
        value: 'Starbucks'
    },
    {
        label: 'Tasters Choice',
        value: 'Tasters Choice'
    },
    {
        label: 'Typhoo',
        value: 'Typhoo'
    },
    {
        label: 'Twinings',
        value: 'Twinings'
    },
]

// coffeeBrandOptions for competitor selector

export const coffeeBrandOptions: SelectOption<CoffeeBrandValue>[] = [
    {
        label: 'Carte Noire',
        value: 'Carte Noire'
    },
    {
        label: 'Douwe Egberts',
        value: 'Douwe Egberts'
    },    
    {
        label: 'Folgers',
        value: 'Folgers'
    },
    {
        label: 'Illy',
        value: 'Illy'
    },
    {
        label: 'Jacobs',
        value: 'Jacobs',
    },
    {
        label: 'Kenco',
        value: 'Kenco'
    },
    {
        label: 'Lavazza',
        value: 'Lavazza'
    },
    {
        label: 'Maxwell House',
        value: 'Maxwell House'
    },
    {
        label: 'Moccona',
        value: 'Moccona'
    },
    {
        label: 'Mount Hagen',
        value: 'Mount Hagen'
    },
    {
        label: 'Nescafé',
        value: 'Nescafé'
    },
    {
        label: 'Starbucks',
        value: 'Starbucks'
    },
    {
        label: 'Tasters Choice',
        value: 'Tasters Choice'
    },
]

// measureOptions

export const measureOptions: SelectOption<MeasureValue>[] = [
    {
        label: 'Sales value',
        value: 'Sales value',
    },
    {
        label: 'Sales units',
        value: 'Sales units',
    },
    {
        label: 'Share of category',
        value: 'Share of category',
    },
    {
        label: 'Av. price per unit',
        value: 'Av. price per unit',
    },
    {
        label: '% sold on promotion',
        value: '% sold on promotion',
    },
    {
        label: 'Rate of sale',
        value: 'Rate of sale',
    },
    {
        label: 'Stores selling',
        value: 'Stores selling',
    },
]
```

TODO: Document the lessons just above

## When a type is going to be used across several files, or doesn't correspond to any one particular component, I use a module file rather than an ambient declaration file, to define shared types

Then I've generally defined it in `sharedTypes.ts`

### Rationale:

- `sharedTypes.ts` needs to import some data objects from other files (eg `App`, or `categoryHierarchy`), so TS immediately recognise it as a module – it wouldn't recognise it as a script, and hence its contents need to be exported and imported.

- ambient declaration files containing one's own code is a discouraged legacy practice. ambient d.ts files should be kept to complete typings missing from DefinitelyTyped, so that I can use any JS module or function even if it doesn't already have a type description.

See [this stack overflow question](https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa).

### Importing type definitions where they are needed

eg from a component file (Sidebar.tsx)

```js
import { DurationOption, DateOption, ComparisonOption, MedicineSubcategoryName, RegionOption, StoreFormatOption, CustomerSegmentOption } from '../../../sharedTypes'
```

