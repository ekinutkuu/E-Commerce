import React from 'react';
import { useHistory } from 'react-router-dom';

const ProductButton = ({ onLogout }) => {

    const history = useHistory();

    const handleProduct = () => {
        history.push('/products');
    };

    return (
        <button onClick={handleProduct} className="btn btn-outline-light" style={{ marginLeft: '10px' }}>
            Products
        </button>
    );
};

export default ProductButton;
