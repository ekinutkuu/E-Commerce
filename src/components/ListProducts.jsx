import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import product_card from "../data/product-data";
import '../css/ListProduct.css';

class ListProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount(){
        ProductService.getProducts().then((res) => {
            this.setState({ products: res.data});
            console.log(res.data);
        });
    }

    render() {
        document.title = "Products";
        return (
                <div className="wrapper">
                    <div className="main_content">
                        <table className="product-table">
                            <thead>
                                <tr>
                                    {/* <th> Product ID </th> */}
                                    <th> Product Name </th>
                                    <th> Product Price </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product => 
                                        <tr>
                                            {/* <td> {product.productId} </td> */}
                                            <td> {product.productName}</td>
                                            <td> {product.productPrice}</td>
                                            <td><button class="add-to-cart">Add to Cart</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
}

export default ListProducts;

