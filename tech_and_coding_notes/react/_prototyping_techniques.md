# React prototyping techniques

## Restricting state, for rapid prototyping purposes

Do these three things

### 1. Limiting on the state type

```
type State = {
    selected: {
        competitor: SelectOption<'Lavazza' | 'Maxwell House'>,
    }
}
```

### 2. Limiting on the action

```
    actions = {
        select: {
            competitor: (newlySelectedCompetitor: SelectOption<'Lavazza' | 'Maxwell House'>) => {
                if (!(newlySelectedCompetitor.value === 'Lavazza' || newlySelectedCompetitor.value === 'Maxwell House')) {
                    window.alert('Prototype: You can only select "Lavazza" or "Maxwell House"')

                } else {
                    this.setState(
                        (prevState: State) => ({
                            selected: {
                                ...prevState.selected,
                                competitor: newlySelectedCompetitor
                            }
                        })
                    )
                }

            },
        }
    }
```

### 3. Limiting in the assetGetter (i.e. enforcing the same limit in types)

```
export const histogramFor = (
    selectedBrand: SelectOption<'Jacobs' | 'Nescafé' | 'Lipton'>,
    selectedCategory: CategoryOption<'Coffee' | 'Instant coffee'>,
    selectedCompetitor: SelectOption<'Lavazza' | 'Maxwell House'>
): string => {

    switch (selectedBrand.value) {
        case 'Jacobs':
        case 'Lipton':
            return svgs.stateDependent.histogram[selectedBrand.value].generic

        case 'Nescafé':
            return svgs.stateDependent.histogram[selectedBrand.value][selectedCategory.id][selectedCompetitor.value]

        default: return assertNever(selectedBrand.value)
    }
}
```
    