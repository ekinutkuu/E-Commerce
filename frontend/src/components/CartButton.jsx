import React from 'react';
import { useHistory } from 'react-router-dom';

const CartButton = () => {

    const history = useHistory();

    const handleCart = () => {
        history.push('/cart');
    };

    return (
        <button onClick={handleCart} className="btn btn-outline-light" style={{ marginLeft: '10px' }}>
            Cart
        </button>
    );
};

export default CartButton;
