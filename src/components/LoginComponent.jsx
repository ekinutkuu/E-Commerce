import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';


class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            emailId: '',
            password: '',
            errorMessage: ''
        }

        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.login = this.login.bind(this);
    }

    changeEmailIdHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    login(e) {
        e.preventDefault();

        let user = {
            emailId: this.state.emailId,
            password: this.state.password
        };

        UserService.authenticateUser(user).then( role => {
            if (role === "ADMIN") {
                this.props.history.push('/users');
            } else if (role === "USER") {
                //console.log("low authorization!");
                this.props.history.push('/products');
            } else {
                console.log("unknown user type");
            }
        }).catch( (error) => {
            this.setState({errorMessage: 'Invalid email or password'});
        });
    }

    render() {
        document.title = "Login";
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="emailId">Email</label>
                                            <input type="text" id="emailId" name="emailId" className="form-control"
                                                value={this.state.emailId} onChange={this.changeEmailIdHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" className="form-control"
                                                value={this.state.password} onChange={this.changePasswordHandler} />
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            {/* <button type="submit" className="btn btn-primary" style={{ height: 'auto' }}>Login</button> */}
                                            <button type="submit" className="btn btn-primary" style={{ height: 'auto' }} onClick={this.login}>Login</button>
                                            <span>Don't have an account? <Link to="/register">Register</Link></span>
                                        </div>
                                        {this.state.errorMessage && <div className="text-danger">{this.state.errorMessage}</div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent
