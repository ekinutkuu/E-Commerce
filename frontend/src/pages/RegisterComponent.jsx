import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';


class RegisterComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            role: 'USER',
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
        }

        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.register = this.register.bind(this);
    }

    changeEmailIdHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changePhoneHandler = (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    register(e) {
        e.preventDefault();

        let user = {
            role: this.state.role.toUpperCase(),
            emailId: this.state.emailId,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
        };
        console.log('user => ' + JSON.stringify(user));

        UserService.createUser(user).then(res => {
            this.props.history.push('/login');
        });
    }

    render() {
        document.title = "Register";
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Register</div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                        <label htmlFor="emailId">Email</label>
                                            <input type="text" id="emailId" className="form-control"
                                                value={this.state.emailId} onChange={this.changeEmailIdHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" className="form-control"
                                                value={this.state.password} onChange={this.changePasswordHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text" id="firstNumber" className="form-control"
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" id="lastNumber" className="form-control"
                                                value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input type="number" pattern="[0-9]*" id="phoneNumber" className="form-control" 
                                                value={this.state.phoneNumber} onChange={this.changePhoneHandler}/>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <button type="submit" className="btn btn-primary" style={{ height: 'auto' }} onClick={this.register}>Register</button>
                                            <span>Already have an account? <Link to="/login">Login</Link></span>
                                        </div>
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

export default RegisterComponent
