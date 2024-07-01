import React, { Component } from "react";
import ProductService from "../services/ProductService";
import CartService from "../services/CartService";
import JwtService from "../services/JwtService";
import { withRouter } from "react-router-dom";
import "../css/ProductPage.css";
import productImage from '../img/question_mark.png';
import Popup from "./Popup";

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            userId: JwtService.getUserId(),
            showPopup: false
        };
    }

    componentDidMount() {
        const { productId } = this.props.match.params;
        ProductService.getProductById(productId)
            .then((res) => {
                this.setState({ product: res.data });
            })
            .catch((error) => {
                console.error("Ürün bilgisi alınırken bir hata oluştu", error);
            });
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
    const { product, showPopup } = this.state;

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div class="container">
        <section class="main">
            <div class="default gallery">
            <div class="main-img">
                <img
                class="active"
                src={productImage}
                style={{ width: "auto", height: "250px" }}
                alt="product-img"
                />
                <img src={productImage} alt="product-img" />
                <img src={productImage} alt="product-img" />
                <img src={productImage} alt="product-img" />
            </div>
            <div class="thumb-list">
                <div class="active">
                <img src={productImage} alt="product-img" />
                </div>
                <div>
                <img src={productImage} alt="product-img" />
                </div>
                <div>
                <img src={productImage} alt="product-img" />
                </div>
                <div>
                <img src={productImage} alt="product-img" />
                </div>
            </div>
            </div>

            <div class="lightbox">
            <div class="gallery">
                <div class="main-img">
                <span class="icon-close">
                    <svg
                    width="14"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                        fill="#69707D"
                        fill-rule="evenodd"
                    />
                    </svg>
                </span>
                <span class="icon-prev">
                    <svg
                    width="12"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M11 1 3 9l8 8"
                        stroke="#1D2026"
                        stroke-width="3"
                        fill="none"
                        fill-rule="evenodd"
                    />
                    </svg>
                </span>
                <span class="icon-next">
                    <svg
                    width="13"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="m2 1 8 8-8 8"
                        stroke="#1D2026"
                        stroke-width="3"
                        fill="none"
                        fill-rule="evenodd"
                    />
                    </svg>
                </span>

                <img
                    class="active"
                    src="images/image-product-1.jpg"
                    alt="product-img"
                />
                <img src="images/image-product-2.jpg" alt="product-img" />
                <img src="images/image-product-3.jpg" alt="product-img" />
                <img src="images/image-product-4.jpg" alt="product-img" />
                </div>
                <div class="thumb-list">
                <div class="active">
                    <img
                    src="images/image-product-1-thumbnail.jpg"
                    alt="product-img"
                    />
                </div>
                <div>
                    <img
                    src="images/image-product-2-thumbnail.jpg"
                    alt="product-img"
                    />
                </div>
                <div>
                    <img
                    src="images/image-product-3-thumbnail.jpg"
                    alt="product-img"
                    />
                </div>
                <div>
                    <img
                    src="images/image-product-4-thumbnail.jpg"
                    alt="product-img"
                    />
                </div>
                </div>
            </div>
            </div>

            <div class="content">
            <h3>{product.productSeller}</h3>
            <h2 class="product-name">{product.productName}</h2>
            <p class="product-desc">
                {product.productDescription}
            </p>
            <div class="price-info">
                <div class="price">
                <span class="current-price">${product.productPrice}</span>
                <span class="discount">0%</span>
                </div>
                <div class="prev-price">${product.productPrice}</div>
            </div>
            <div class="add-to-cart-container">
                <div class="counter">
                <button class="minus">
                    <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <path
                        d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                        id="a"
                        />
                    </defs>
                    <use fill="#FF7E1B" fillRule="nonzero" xlinkHref="#a" />
                    </svg>
                </button>
                <span class="count">1</span>
                <button class="plus">
                    <svg
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <defs>
                        <path
                        d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                        id="b"
                        />
                    </defs>
                    <use xlinkHref="#b" fill="#FF7E1B" fillRule="nonzero" />
                    </svg>
                </button>
                </div>
                <button class="add-to-cart" onClick={() => this.addToCart(product)}>
                <span>
                    <svg
                    width="22"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                        fill="#69707D"
                        fill-rule="nonzero"
                    />
                    </svg>
                </span>
                <span>Add to cart</span>
                </button>
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

        </section>
        </div>
        );
    }
}

export default withRouter(ProductPage);
