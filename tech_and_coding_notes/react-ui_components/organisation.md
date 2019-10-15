# React UI components organisation

## Create atom components quickly, even if it's in the same file of a single component that uses it

When I want to reuse a node, it's much better to declare a component, even in the same file,
vs. creating a function that needs to take arguments in a certain order and using it

```js
type OptionProps = {
    text: string, 
    disabled?: boolean, 
    onClick?: (selectedOption: ViewConfiguration | any) => void,
    key?: string,
}

class Option extends React.Component<OptionProps, {}> {
    static defaultProps = {
        disabled: false, 
        onClick: () => {},
    }

    render() {
        const { props } = this

        return (
            <div
                className={classNames(
                    styles.option,
                    {
                        [styles.option_disabled]: props.disabled,
                        [styles.option_enabled]: !props.disabled,
                    }
                )}
                onClick={props.onClick}
            >
                {props.text}
            </div>
        )
    }

}

// COMPONENT

type Props = {
    savedConfigurations: ViewConfiguration[],
    previouslySavedFiltersReflectCurrentFilters: boolean,
    handleCreateNewConfigSelection: () => void,
    handleConfigSelection: (configToLoad: ViewConfiguration) => void,
}

type State = {
    saveConfigurationPanelVisible: boolean,
}

export class KebabDropDown extends React.Component<Props, State> {

    state = {
        saveConfigurationPanelVisible: false,
    }

    actions = {
        showSaveConfigurationPanel: () => {
            this.setState({
                saveConfigurationPanelVisible: true
            })
        },

        hideSaveConfigurationPanel: () => {
            this.setState({
                saveConfigurationPanelVisible: false,
            })
        },
    }

    render() {
        const { props } = this

        return (
            <div
                className={styles.KebabDropDown}
                onClick={() => {
                    if (this.state.saveConfigurationPanelVisible) {
                        this.actions.hideSaveConfigurationPanel()
                    } else {
                        this.actions.showSaveConfigurationPanel()
                    }
                }}
            >
                <img
                    src={svgs.nonStateDependent.kebabCircles}
                />

                {this.state.saveConfigurationPanelVisible &&
                    <>
                        <div
                            className={styles.viewConfigurationPanel}
                            
                        >
                            <div
                                className={styles.firstOptionsGroup}
                            >
                                <Option
                                    text='Save changes to configuration'
                                    disabled={props.previouslySavedFiltersReflectCurrentFilters}
                                />

                                <Option
                                    text='Create new configuration'
                                    onClick={props.handleCreateNewConfigSelection}
                                />
                            </div>

                            <div
                                className={styles.secondOptionsGroup}
                            >
                                {
                                    (props.savedConfigurations.length > 0) &&
                                    props.savedConfigurations.reverse().map(
                                        (savedConfiguration: ViewConfiguration, index: number) => 
                                        // tslint:disable-next-line:jsx-key
                                        <Option
                                            text={savedConfiguration.title} 
                                            key={`${savedConfiguration.title}${index}`}
                                            onClick={() => {
                                                props.handleConfigSelection(savedConfiguration)
                                            }}
                                        />
                                    )
                                }

                                {
                                    (props.savedConfigurations.length === 0) && 
                                    <div
                                        className={styles.noSavedConfig}
                                    >
                                        No saved configuration
                                    </div>
                                }

                            </div>

                            <div
                                className={styles.thirdOptionsGroup}
                            >
                                <Option
                                    text='Edit saved configurations'
                                    disabled={_.isEmpty(props.savedConfigurations)}
                                />
                            </div>
                        </div>

                        <div 
                            className={styles.backdrop}
                        />
                    </>
                }
            </div>
        )
    }
}
```