import React, { Component } from 'react'
import userService from '../services/UserService';
import Popup from "../components/Popup";


class CreateUserComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            phoneNumber: '',
            password: '',
            role: 'USER',
            showPopup: false
        }
        
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeRoleHandler = this.changeRoleHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            userService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailId : user.emailId,
                    phoneNumber: user.phoneNumber,
                    password: user.password,
                    role: user.role
                });
            });
        }        
    }
    saveOrUpdateUser = (e) => {
        e.preventDefault();

        const { emailId, password, role, firstName, lastName, phoneNumber } = this.state

        if (!emailId || !password || !role || !firstName || !lastName || !phoneNumber) {
            console.log('Missing Values!');
            this.setState({ showPopup: true });
            return;
        }

        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
            role: this.state.role.toUpperCase()
        };
        console.log('user => ' + JSON.stringify(user));

        // step 5
        if(this.state.id === '_add'){
            userService.createUser(user).then(res =>{
                this.props.history.push('/users');
            });
        }else{
            userService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/users');
            });
        }
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
        this.setState({phoneNumber: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    changeRoleHandler = (event) => {
        this.setState({role: event.target.value});
    }


    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add User</h3>
        }else{
            return <h3 className="text-center">Update User</h3>
        }
    }
    render() {
        document.title = "Create User";
        const { showPopup } = this.state;
        return (
            <div>
                <br></br>
                    <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> User Type: </label>
                                                <select name="role" className="form-control" value={this.state.role} onChange={this.changeRoleHandler}>
                                                        {/* <option value="">Select a Role</option> */}
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                </select>
                                        </div>
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
                                            <input type="number" pattern="[0-9]*" placeholder="Enter Your Phone Number" name="phoneNumber" className="form-control" 
                                                value={this.state.phoneNumber} onChange={this.changePhoneHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                {/* Popup */}
                {showPopup && (
                    <Popup trigger={true}>
                        <div>
                            <h1>Missing Values!</h1>
                            <p>You cannot leave empty values in the input box</p>
                            <button onClick={() => this.setState({ showPopup: false })}>Close</button>
                        </div>
                    </Popup>
                )}

            </div>
        )
    }
}

export default CreateUserComponent
