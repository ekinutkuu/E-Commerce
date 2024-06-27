import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';
import JwtService from '../services/JwtService';
import product_card from "../data/product-data";
import '../css/ListProduct.css';

class ListProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            userId: JwtService.getUserId()
        };
    }

    componentDidMount(){
        ProductService.getProducts().then((res) => {
            this.setState({ products: res.data});
            console.log(res.data);
        });
        console.log(this.state.userId);
    }

    addToCart = (product) => {
        const cartItem = {
            product: {
                productId: product.productId
            },
            quantity: 1
        };

        CartService.addToCart(this.state.userId, cartItem)
            .then(response => {
                console.log("Ürün sepete eklendi", response.data);
            })
            .catch(error => {
                console.error("Sepete eklenirken bir hata oluştu", error);
            });
    };

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
                                            <td><button className="add-to-cart" onClick={() => this.addToCart(product)}>Add to Cart</button></td>
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

