import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";
const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

class userService {

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
        return axios.post(API_BASE_URL + "/login", user)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .catch(error => {
                console.error(error.response ? error.response.data : error.message);
                throw error;
            });
    }
    
}

export default new userService()