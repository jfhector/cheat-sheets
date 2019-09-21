import React, { ChangeEvent } from 'react';

type Props = {
    searchString: string,
    searchStringHandleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    showOnlyStocked: boolean,
    showOnlyStockedHandleChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const SearchBar = (props: Props) => {
    const { searchString, searchStringHandleChange, showOnlyStocked, showOnlyStockedHandleChange } = props;

    return (
        <div>
            <div>
                <label htmlFor="search-input">What product are you looking for?</label>
                <input type="text" id="search_input" onChange={searchStringHandleChange} value={searchString}/>
            </div>

            <div>
                <input type="checkbox" id="only_show_stocked_checkbox" onChange={showOnlyStockedHandleChange} checked={showOnlyStocked} />
                <label htmlFor="only_show_stocked_checkbox">Only show products in stock</label>
            </div>
        </div>
    );
};
