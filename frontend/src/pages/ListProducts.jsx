import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import CartService from '../services/CartService';
import JwtService from '../services/JwtService';
import '../css/ListProduct.css';
import ProductCard from '../components/ProductCard';
import Popup from "../components/Popup";


class ListProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            selectedCategory: "",
            userId: JwtService.getUserId(),
            showPopup: false
        };
    }

    componentDidMount(){
        this.fetchProducts();
        this.fetchCategories();
        //console.log(this.state.userId);
    }

    fetchProducts = () => {
        ProductService.getProducts().then((res) => {
            this.setState({ products: res.data});
            console.log(res.data);
        });
    }

    fetchCategories = () => {
        ProductService.getCategories().then((res) => {
            this.setState({ categories: res.data });
            console.log(res.data);
        });
    }

    handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        if (categoryId) {
            ProductService.getProductByCategory(categoryId).then((res) => {
                this.setState({ products: res.data, selectedCategory: categoryId });
            });
        } else {
            this.fetchProducts();
            this.setState({ selectedCategory: '' });
        }
    }

    addToCart = (product) => {
        if (!JwtService.isLogin()) {
            console.log("User is not logged in!");
            this.setState({ showPopup: true });
            return;
        }

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

        const { showPopup, categories, selectedCategory } = this.state;

        return (
            <div className="wrapper">
                <div className="main_content">
                    <div className="row">
                        <div className="col-12">
                            <select value={selectedCategory} onChange={this.handleCategoryChange} className="form-select">
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.categoryName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
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
                    
                    {/* Popup */}
                    {showPopup && (
                        <Popup trigger={true}>
                            <div>
                                <h1>Please Log In!</h1>
                                <p>You must be logged in to add the product to the cart</p>
                                <button onClick={() => this.setState({ showPopup: false })}>Close</button>
                            </div>
                        </Popup>
                    )}

                </div>
            </div>
        );
    }
}

export default ListProducts;