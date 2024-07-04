import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "../css/AdminPage.css";
import jwtService from '../services/JwtService';
import userService from '../services/UserService';

class AdminPage extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            isAdmin: false,
            loading: true
        }
    }

    componentDidMount(){
        const isAdmin = jwtService.getRoles().includes("ADMIN");
        this.setState({ isAdmin, loading: false });

        if (isAdmin) {
            userService.getUsers().then((res) => {
                this.setState({ users: res.data});
                console.log(res.data);
            })
        }
    }

    handleUsersPage = () => {
        this.props.history.push('/users');
    }

    handleProductsPage = () => {
        this.props.history.push('/admin/products');
    }

    render() {
        document.title = "Admin Panel";

        if (!this.state.isAdmin) {
            return(
                <h1>This is admin panel and you don't have permission</h1>
            );
        }

        return(
            <div className="wrapper-adminpage">
                <div className="main-content">
                    <div className="adminpanel-info-texts">
                        <h1>Admin Panel</h1>
                        <p>Here you can do the following actions: view, edit, add, delete</p>
                    </div>
                    <div className="admin-panel-buttons">
                        <button onClick={this.handleUsersPage} className='admin-panel-button'>Manage Users</button>
                        <button onClick={this.handleProductsPage} className='admin-panel-button'>Manage Products</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminPage;