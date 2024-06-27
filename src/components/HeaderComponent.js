import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import ProductButton from './ProductButton';
import CartButton from './CartButton';

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
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark justify-content-between">
                        <div><a href="/" className="navbar-brand">User Management App</a></div>
                        <div>
                            <ProductButton  />
                            <CartButton />
                            <LogoutButton onLogout={this.props.onLogout} />
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
