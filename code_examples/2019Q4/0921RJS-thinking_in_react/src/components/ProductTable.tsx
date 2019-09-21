import React from 'react';
import { ProductData } from './../data/productData';

type Props = {
    filteredProductData: ProductData,
}

export const ProductTable = (props: Props) => {
    const { filteredProductData } = props;

    // No idea why that didn't work. Next step would be to try it in JS, to see if it works.
    // const categoriesInFilteredProductData = filteredProductData.reduce(
        //     (accumulator: Array<string>, currentValue: ProductItem) => {
            //         if (!accumulator.includes(currentValue.category)) {
                //             let copyOfAccumulator = accumulator;
                //             let result = copyOfAccumulator.push(currentValue.category);
                //             return result;
                //         } else {
                    //             return accumulator;
                    //         }
                    //     },
                    //     []
                    // );
                    
    // I use this as a much simpler alternative. It works really well
    const productCategories = [...new Set(filteredProductData.map(productDataItem => productDataItem.category))];
    
    return (
        <div>
            {
                productCategories.map((productCategory, productCategoryIndex) => (
        
                    <div key={productCategoryIndex}>
                        <h2>{productCategory}</h2>
        
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
        
                            <tbody>
                                {filteredProductData.filter(filteredProductDataItem => filteredProductDataItem.category === productCategory).map((productItem, productItemIndex) => (
            
                                    <tr key={productItemIndex}>
                                        <td className={!productItem.stocked ? 'out-of-stock' : ''}>{productItem.name}</td>
                                        <td>{productItem.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            }
        </div>
    );
};
