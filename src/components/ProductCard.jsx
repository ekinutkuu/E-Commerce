import React from 'react';
import { Link } from 'react-router-dom';
import productImage from '../img/question_mark.png';
import '../css/ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="product-card">
            <img className="product-card-img-top" src={productImage} alt={product.productName} />
            <div className="product-card-body">
                <Link to="#" className="product-card-title">{product.productName}</Link>
                <p className="product-card-text">{product.description}</p>
                <p className="product-card-price">${product.productPrice}</p>
                <button className="btn btn-warning" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
