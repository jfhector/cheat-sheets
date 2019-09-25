# React UI components prototyping techniques

## Simulating loading delays

```
    actions = {
        select: {
            brand: (newlySelectedBrand: SelectOption<'Jacobs' | 'Nescafé' | 'Lipton'>) => {
                if (!(newlySelectedBrand.value === 'Nescafé' || newlySelectedBrand.value === 'Lipton' || newlySelectedBrand.value === 'Jacobs')) {
                    window.alert('Prototype: You can only select "Nescafé" or "Lipton"')

                } else {
                    this.setState(
                        (prevState: State) => ({
                            loading: true,
                            selected: {
                                ...prevState.selected,
                                brand: newlySelectedBrand,
                            },
                        })
                    )

                    window.setTimeout(
                        () => {
                            this.setState({
                                loading: false,
                            })
                        }, 
                        400
                    )
                }
            },
```


