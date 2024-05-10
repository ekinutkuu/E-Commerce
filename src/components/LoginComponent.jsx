import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class LoginComponent extends Component {
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
                                            <input type="text" id="emailId" name="emailId" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" className="form-control" />
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <button type="submit" className="btn btn-primary" style={{ height: 'auto' }}>Login</button>
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
