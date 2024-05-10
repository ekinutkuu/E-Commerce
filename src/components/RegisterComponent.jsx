import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class RegisterComponent extends Component {
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
                                            <input type="text" id="emailId" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" className="form-control" />
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <button type="submit" className="btn btn-primary" style={{ height: 'auto' }}>Create</button>
                                            <span>Already have an account? <Link to="/">Login</Link></span>
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
