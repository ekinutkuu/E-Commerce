import axios from 'axios';

const PRODUCTS_API_BASE_URL = "http://localhost:8080/api/v1/products";

class ProductService {

    getProducts(){
        return axios.get(PRODUCTS_API_BASE_URL);
    }

    getProductById(productId) {
        return axios.get(PRODUCTS_API_BASE_URL + "/" + productId);
    }

}

export default new ProductService()