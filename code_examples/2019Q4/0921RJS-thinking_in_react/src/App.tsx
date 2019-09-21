import React, { ChangeEvent } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';
import { productDataFromDatabase, ProductData } from './data/productData';
import { ProductTable } from './components/ProductTable';

function filteredProductData(productData: ProductData, searchString: string, showOnlyStocked: boolean): ProductData {
    return productData.filter(
        productDataItem => 
            (!showOnlyStocked || showOnlyStocked && productDataItem.stocked)
            && productDataItem.name.toUpperCase().includes(searchString.toUpperCase())
    );
}

type State = {
    showOnlyStocked: boolean,
    searchString: string,
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            searchString: '',
            showOnlyStocked: false,
        };

        this.searchStringHandleChange = this.searchStringHandleChange.bind(this);
        this.showOnlyStockedHandleChange = this.showOnlyStockedHandleChange.bind(this);
    }

    searchStringHandleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({searchString: e.target.value});
    }

    showOnlyStockedHandleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({showOnlyStocked: e.target.checked});
    }

    render() {
        const { showOnlyStocked, searchString } = this.state;

        return (
            <div>
                <div>
                    <SearchBar
                        searchString={searchString}
                        searchStringHandleChange={this.searchStringHandleChange}
                        showOnlyStocked={showOnlyStocked}
                        showOnlyStockedHandleChange={this.showOnlyStockedHandleChange} />
                </div>

                <div>
                    <ProductTable
                        filteredProductData={
                            filteredProductData(productDataFromDatabase, searchString, showOnlyStocked)
                        }
                    />
                </div>
            </div>
        );
    };
}

export default App;
