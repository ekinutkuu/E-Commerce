import React from 'react';
import { Link } from 'react-router-dom';
import productImage from '../img/question_mark.png';
import '../css/ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="product-card">
            <img className="product-card-img-top" src={productImage} alt={product.productName} />
            <div className="product-card-body">
                <Link to={`/product/${product.productId}`} className="product-card-title">{product.productName}</Link>
                <p className="product-card-text">{product.description}</p>
                <p className="product-card-price">${product.productPrice}</p>
                <button className="btn btn-warning" onClick={() => addToCart(product)}>Add to Cart</button>
                <Link to={`/product/${product.productId}`} className="more-info-text d-flex mt-4">More Info</Link>
            </div>
        </div>
    );
};

export default ProductCard;
