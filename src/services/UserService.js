import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

class userService {

    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
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
        return axios.post(USER_API_BASE_URL + '/login', user)
            .then(response => response.data); //kullanıcının user type'ını geri döndürüyor
    }
    
}

export default new userService()