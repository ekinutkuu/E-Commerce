import axios from 'axios';

const CARTS_API_BASE_URL = "http://localhost:8080/api/v1/carts";

class CartService {

    addToCart(userId, cartItem) {
        return axios.post(`${CARTS_API_BASE_URL}/${userId}/add`, cartItem);
    }

    getCartItems(userId) {
        return axios.get(`${CARTS_API_BASE_URL}/${userId}`);
    }

    removeFromCart(userId, productId) {
        return axios.delete(`${CARTS_API_BASE_URL}/${userId}/remove/${productId}`);
    }

}

export default new CartService()