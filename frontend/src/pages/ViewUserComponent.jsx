import React, { Component } from 'react'
import userService from '../services/UserService'

class ViewUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            user: {}
        }
    }

    componentDidMount(){
        userService.getUserById(this.state.id).then( res => {
            this.setState({user: res.data});
        })
    }

    render() {
        document.title = "View User Details";
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View User Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> User Role: </label>
                            <div> { this.state.user.role }</div>
                        </div>
                        <div className = "row">
                            <label> user First Name: </label>
                            <div> { this.state.user.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> user Last Name: </label>
                            <div> { this.state.user.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> user Email ID: </label>
                            <div> { this.state.user.emailId }</div>
                        </div>
                        <div className = "row">
                            <label> Phone Number: </label>
                            <div> { this.state.user.phoneNumber }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewUserComponent
