import React, { Component } from 'react';
import CartService from '../services/CartService';
import JwtService from '../services/JwtService';
import '../css/CartPage.css';

class CartPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            userId: JwtService.getUserId()
        };
    }

    componentDidMount() {
        this.loadCartItems();
    }

    loadCartItems = () => {
        CartService.getCartItems(this.state.userId).then((res) => {
            this.setState({ cartItems: res.data });
            console.log(res.data);
        }).catch(error => {
            console.error("Sepet bilgileri çekilirken bir hata oluştu", error);
        });
    }

    removeFromCart = (productId) => {
        CartService.removeFromCart(this.state.userId, productId).then(res => {
            this.loadCartItems();
        }).catch(error => {
            console.error("Ürün sepetten kaldırılırken bir hata oluştu", error);
        });
    }

    render() {
        document.title = "Cart";
        return (
            <div className="cart-wrapper">
                <div className="main_content">
                    
                    <br />
                    <h1>Your Cart</h1>
                    <br />

                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th> Product Name </th>
                                <th> Quantity </th>
                                <th> Price </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cartItems.map(
                                    item => 
                                    <tr key={item.cartItemId}>
                                        <td> {item.product.productName} </td>
                                        <td> {item.quantity} </td>
                                        <td> {item.product.productPrice} </td>
                                        <td><button className="remove-button" onClick={() => this.removeFromCart(item.product.productId)}>Remove</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CartPage;