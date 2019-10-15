# Representing a category hierarchy

```
// TYPES

export type CategoryId =
    'Ground coffee' |
    'Instant coffee' |
    'Decaf coffee' |
    'Coffee pods' |
    'Iced coffee' |
    'Coffee beans' |
    'Capucino latte and mocha' |
    'Coffee' |
    'Instant tea' |
    'Fruit and herbal tea' |
    'White tea' |
    'Green tea' |
    'Black tea' |
    'Redbush tea' |
    'Tea' |
    'Drinks'

export type CategoryOption<T extends CategoryId> = {
    id: T;
    name: string;
    parentGroupId: string;
    subGroups: Array<CategoryOption<CategoryId>>;
    hierarchyLevel: number;
}

// DATA

const groundCoffeeCategory: CategoryOption<'Ground coffee'> = {
    id: 'Ground coffee',
    name: 'Ground coffee',
    parentGroupId: 'coffee',
    subGroups: [],
    hierarchyLevel: 2,
}

const instantCoffeeCategory: CategoryOption<'Instant coffee'> = {
    id: 'Instant coffee',
    name: 'Instant coffee',
    parentGroupId: 'coffee',
    subGroups: [],
    hierarchyLevel: 2,
}

const decafCoffeeCategory: CategoryOption<'Decaf coffee'> = {
    id: 'Decaf coffee',
    name: 'Decaf coffee',
    parentGroupId: 'coffee',
    subGroups: [],
    hierarchyLevel: 2,
}

const coffeePodsCategory: CategoryOption<'Coffee pods'> = {
    id: 'Coffee pods',
    name: 'Coffee pods',
    parentGroupId: 'coffee',
    subGroups: [],
    hierarchyLevel: 2,
}

const icedCoffeeCategory: CategoryOption<'Iced coffee'> = {
    id: 'Iced coffee',
    name: 'Iced coffee',
    parentGroupId: 'coffee',
    subGroups: [],
    hierarchyLevel: 2,
}

const coffeeBeansCategory: CategoryOption<'Coffee beans'> = {
    id: 'Coffee beans',
    name: 'Coffee beans',
    parentGroupId: 'coffee',
    subGroups: [],
    hierarchyLevel: 2,
}

const capucinoLatteAndMochaCategory: CategoryOption<'Capucino latte and mocha'> = {
    id: 'Capucino latte and mocha',
    name: 'Capucino latte and mocha',
    parentGroupId: 'coffee',
    subGroups: [],
    hierarchyLevel: 2,
}

const coffeeCategory: CategoryOption<'Coffee'> = {
    id: 'Coffee',
    name: 'Coffee',
    parentGroupId: 'Drinks',
    subGroups: [
        groundCoffeeCategory,
        instantCoffeeCategory,
        decafCoffeeCategory,
        coffeePodsCategory,
        icedCoffeeCategory,
        coffeeBeansCategory,
        capucinoLatteAndMochaCategory,
    ],
    hierarchyLevel: 1,
}

const instantTea: CategoryOption<'Instant tea'> = {
    id: 'Instant tea',
    name: 'Instant tea',
    parentGroupId: 'Tea',
    subGroups: [],
    hierarchyLevel: 2,
}

const fruitAndHerbalTea: CategoryOption<'Fruit and herbal tea'> = {
    id: 'Fruit and herbal tea',
    name: 'Fruit and herbal tea',
    parentGroupId: 'Tea',
    subGroups: [],
    hierarchyLevel: 2,
}

const whiteTea: CategoryOption<'White tea'> = {
    id: 'White tea',
    name: 'White tea',
    parentGroupId: 'Tea',
    subGroups: [],
    hierarchyLevel: 2,
}

const greenTea: CategoryOption<'Green tea'> = {
    id: 'Green tea',
    name: 'Green tea',
    parentGroupId: 'Tea',
    subGroups: [],
    hierarchyLevel: 2,
}

const blackTea: CategoryOption<'Black tea'> = {
    id: 'Black tea',
    name: 'Black tea',
    parentGroupId: 'Tea',
    subGroups: [],
    hierarchyLevel: 2,
}

const redbushTea: CategoryOption<'Redbush tea'> = {
    id: 'Redbush tea',
    name: 'Redbush tea',
    parentGroupId: 'Tea',
    subGroups: [],
    hierarchyLevel: 2,
}

const teaCategory: CategoryOption<'Tea'> = {
    id: 'Tea',
    name: 'Tea',
    parentGroupId: 'Drinks',
    subGroups: [
        instantTea,
        fruitAndHerbalTea,
        whiteTea,
        greenTea,
        blackTea,
        redbushTea,
    ],
    hierarchyLevel: 1,
}

export const drinksCategory: CategoryOption<'Drinks'> = {
    id: 'Drinks',
    name: 'Drinks',
    parentGroupId: 'no_parent',
    subGroups: [coffeeCategory, teaCategory],
    hierarchyLevel: 0,
}

// Helper

export const categoryIdsToObjects = {
    'Drinks': drinksCategory,
    'Coffee': coffeeCategory,
    'Capucino latte and mocha': capucinoLatteAndMochaCategory,
    'Coffee beans': coffeeBeansCategory,
    'Iced coffee': icedCoffeeCategory,
    'Coffee pods': coffeePodsCategory,
    'Decaf coffee': decafCoffeeCategory,
    'Instant coffee': instantCoffeeCategory,
    'Ground coffee': groundCoffeeCategory,
}

```
