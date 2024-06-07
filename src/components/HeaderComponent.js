import React, { Component } from 'react';
import LogoutButton from './LogoutButton';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="/" className="navbar-brand">User Management App</a></div>
                        <LogoutButton onLogout={this.props.onLogout} />
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
