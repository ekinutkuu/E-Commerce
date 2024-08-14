import React, { Component } from 'react'
import userService from '../services/UserService'
import jwtService from '../services/JwtService'

class ListUserComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            isAdmin: false,
            loading: true
        }

        this.addUser = this.addUser.bind(this);
        this.edituser = this.edituser.bind(this);
        this.deleteuser = this.deleteuser.bind(this);
    }

    deleteuser(id){
        userService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }
    viewuser(id){
        this.props.history.push(`/view-user/${id}`);
    }
    edituser(id){
        this.props.history.push(`/add-user/${id}`);
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

    addUser(){
        this.props.history.push('/add-user/_add');
    }

    render() {
        document.title = "User Management";

        if (this.state.loading) {
            return(
                <h1>Loading...</h1>
            );
        }

        if (!this.state.isAdmin) {
            return(
                <h1>This is admin panel and you don't have permission</h1>
            );
        }

        return (
            <div>
                <h2 className="text-center" style={{margin: "20px 0"}}>Users List</h2>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.addUser}> Add User</button>
                </div>
                <br></br>
                <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> User Type </th>
                                    <th> User Email Id</th>
                                    <th> Password </th>
                                    <th> User First Name</th>
                                    <th> User Last Name</th>
                                    <th> User Phone Number </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user => 
                                        <tr key = {user.id}>
                                            <td> {user.role} </td>
                                            <td> {user.emailId}</td>
                                            <td> {user.password} </td>
                                            <td> {user.firstName} </td>   
                                            <td> {user.lastName}</td>
                                            <td> {user.phoneNumber} </td>
                                            <td>
                                                <button onClick={ () => this.edituser(user.id)} className="btn btn-info">Update </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteuser(user.id)} className="btn btn-danger">Delete </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.viewuser(user.id)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                </div>

            </div>
        )
    }
}

export default ListUserComponent
