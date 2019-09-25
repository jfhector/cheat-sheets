# Control flow

## Switch

### Iterating over `true` in a switch statement, to go to the first case that evaluates to true

```
switch (true) {
    case remainingMopedVolume(context.state.basket) < 0:
        return (
            <>
                <p>
                    You are over your space limit by {-remainingMopedVolume(context.state.basket)}%
                </p>

                <Spacer
                    direction='vertical'
                    amount={6}
                />
            </>
        )

    case remainingMopedVolume(context.state.basket) <= 25:
        return (
            <>
                <p>
                    Remaining space on your moped {remainingMopedVolume(context.state.basket)}%
                </p>

                <Spacer
                    direction='vertical'
                    amount={6}
                />                                            
            </>
        )
    
    default:
        return null
}
```