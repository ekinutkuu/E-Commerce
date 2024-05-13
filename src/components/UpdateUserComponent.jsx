import React, { Component } from 'react'
import userService from '../services/UserService';

class UpdateuserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            phoneNumber: '',
            phoneNumber: '',
            userType: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeUserTypeHandler = this.changeUserTypeHandler.bind(this);
        this.updateuser = this.updateuser.bind(this);
    }

    componentDidMount(){
        userService.getuserById(this.state.id).then( (res) =>{
            let user = res.data;
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                emailId : user.emailId,
                phoneNumber: user.phoneNumber,
                password: user.password,
                userType: user.userType
            });
        });
    }

    updateuser = (e) => {
        e.preventDefault();
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
            userType: this.state.userType
        };
        console.log('user => ' + JSON.stringify(user));
        console.log('id => ' + JSON.stringify(this.state.id));
        userService.updateuser(user, this.state.id).then( res => {
            this.props.history.push('/users');
        });
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    changePhoneHandler = (event) => {
        this.setState({userType: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    changeUserTypeHandler = (event) => {
        this.setState({userType: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    render() {
        document.title = "Update User";
        return (
            <div>
                <br></br>
                    <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update user</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Password: </label>
                                            <input placeholder="Enter Your Password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Phone Number: </label>
                                            <input type="number" placeholder="Enter Your Phone Number" name="phoneNumber" className="form-control" 
                                                value={this.state.phoneNumber} onChange={this.changePhoneHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateuser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
            </div>
        )
    }
}

export default UpdateuserComponent
