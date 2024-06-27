import { jwtDecode } from 'jwt-decode';

class JwtService {
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.token = localStorage.getItem("token");
    }

    decodeToken() {
        if (this.token) {
            try {
                const decodedToken = jwtDecode(this.token);
                return decodedToken;
            }
            catch (error) {
                console.error("Error decoding token: ", error);
                return null;
            }
        } else {
            console.error("Token not found in local storage");
            return null;
        }
    }

    getUserId() {
        if (this.decodeToken()) {
            return this.decodeToken().userId;
        } else {
            console.warn("No valid token found.");
        }
    }

    getUsername() {
        if (this.decodeToken()) {
            return this.decodeToken().username;
        } else {
            console.warn("No valid token found.");
        }
    }

    getPassword() {
        if (this.decodeToken()) {
            return this.decodeToken().password;
        } else {
            console.warn("No valid token found.");
        }
    }

    getRoles() {
        if (this.decodeToken()) {
            const roles = this.decodeToken().roles;

            if (roles && Array.isArray(roles) && roles.length > 0) {
                return roles.map(role => role.authority);
            } else return [];
        } else {
            console.warn("No valid token found.");
            return [];
        }
    }
}

export default new JwtService();
