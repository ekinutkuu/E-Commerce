import axios from 'axios';

const PRODUCTS_API_BASE_URL = "http://localhost:8080/api/v1/products";

class CategoryService {

    getCategories() {
        return axios.get(PRODUCTS_API_BASE_URL + "/categories");
    }

    getCategoryById(categoryId) {
        return axios.get(PRODUCTS_API_BASE_URL + "/category/categoryid/" + categoryId);
    }

    createCategory(category) {
        return axios.post("http://localhost:8080/api/v1/products/category/create", category);
    }

    updateCategory(category, categoryId) {
        return axios.put(PRODUCTS_API_BASE_URL + "/category/update/" + categoryId, category);
    }

}

export default new CategoryService();
