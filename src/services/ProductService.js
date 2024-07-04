import axios from 'axios';

const PRODUCTS_API_BASE_URL = "http://localhost:8080/api/v1/products";

class ProductService {

    getProducts(){
        return axios.get(PRODUCTS_API_BASE_URL);
    }

    createProduct(product) {
        return axios.post(PRODUCTS_API_BASE_URL + "/create", product);
    }

    updateProduct(product, productId) {
        return axios.put(PRODUCTS_API_BASE_URL + "/edit/" + productId, product);
    }

    deleteProduct(productId) {
        return axios.delete(PRODUCTS_API_BASE_URL + "/delete/" + productId);
    }

    getProductById(productId) {
        return axios.get(PRODUCTS_API_BASE_URL + "/" + productId);
    }

    getCategories() {
        return axios.get(`${PRODUCTS_API_BASE_URL}/categories`);
    }

    getProductByCategory(categoryId) {
        return axios.get(`${PRODUCTS_API_BASE_URL}/category/${categoryId}`);
    }

}

export default new ProductService()