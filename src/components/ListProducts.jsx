import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';
import JwtService from '../services/JwtService';
import product_card from "../data/product-data";
import '../css/ListProduct.css';
import ProductCard from './ProductCard';

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
                    <div className="container mt-5">
                        <div className="row">
                            {this.state.products.map(product => (
                                <ProductCard
                                    key={product.productId}
                                    product={product}
                                    addToCart={this.addToCart}
                                    className="col-lg-4 col-md-6 mb-4"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListProducts;