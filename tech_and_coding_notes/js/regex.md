# RegEx

## API

### Using RegEx.exec(value) to check whether a value conforms to a RegEx

```
render() {
    const postcodeRegEx = /^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/

    return (
        <Context.Consumer>
            {context => (

                <>
                    <div>
                        Where do you want us to deliver your items?
                    </div>

                    <div>
                        Type in your postcode and our delivery partner will deliver there
                    </div>
                    
                    <div>
                        <input
                            type='text'
                            placeholder='Postcode'
                            onChange={(event) => {
                                this.setState({nextDisabled: !postcodeRegEx.exec(event.target.value)})
                            }}
                        />
                    </div>
```
