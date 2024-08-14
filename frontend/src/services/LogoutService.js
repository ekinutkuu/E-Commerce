import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/v1";

class LogoutService {

    logout(){
        localStorage.removeItem("token");
        return axios.get(API_BASE_URL + "/logout");
    }

}

export default new LogoutService()