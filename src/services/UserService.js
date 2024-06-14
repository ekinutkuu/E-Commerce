import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";
const USER_API_BASE_URL = `${API_BASE_URL}/users`;

class UserService {

    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user){
        return axios.post(API_BASE_URL + "/register", user);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    updateUser(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }

    authenticateUser(user) {
        return axios.post(`${API_BASE_URL}/login`, user)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                console.log("user session token: "+response.data.token);
                return response.data;
            })
            .catch(error => {
                console.error(error.response ? error.response.data : error.message);
                throw error;
            });
    }
}

export default new UserService();

/*
import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";
const USER_API_BASE_URL = `${API_BASE_URL}/users`;

class UserService {

    getUsers() {
        const token = localStorage.getItem('token');
        return axios.get(USER_API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    createUser(user) {
        const token = localStorage.getItem('token');
        return axios.post(`${API_BASE_URL}/register`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getUserById(userId) {
        const token = localStorage.getItem('token');
        return axios.get(`${USER_API_BASE_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    updateUser(user, userId) {
        const token = localStorage.getItem('token');
        return axios.put(`${USER_API_BASE_URL}/${userId}`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    deleteUser(userId) {
        const token = localStorage.getItem('token');
        return axios.delete(`${USER_API_BASE_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    authenticateUser(user) {
        return axios.post(`${API_BASE_URL}/login`, user)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                console.log("login olurken atanan token: "+response.data.token);
                return response.data;
            })
            .catch(error => {
                console.error(error.response ? error.response.data : error.message);
                throw error;
            });
    }
}

export default new UserService();
*/