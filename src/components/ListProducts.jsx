import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import product_card from "../data/product-data";
import '../css/ListProduct.css';

class ListProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount(){
        ProductService.getProducts().then((res) => {
            this.setState({ products: res.data});
            console.log(res.data);
        });
    }

    render() {
        document.title = "Products";

        console.log(product_card);

        const listItems = product_card.map((item) =>
            <div className="card" key={item.id}>
                <div className="card_img">
                    <img src={item.thumb} alt='product' />
                </div>
                <div className="card_header">
                    <h2>{item.product_name}</h2>
                    <p>{item.description}</p>
                    <p className="price">{item.price}<span>{item.currency}</span></p>
                    <div className="addToCard">Add to cart</div>
                </div>
            </div>
        );

        return (
/*             <div className="wrapper">
                <div className="main_content">
                    {listItems}
                </div> */

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th> Product ID </th>
                                <th> Product Name </th>
                                <th> Product Price </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(
                                    product => 
                                    <tr key={product.productId}>
                                        <td> {product.productId} </td>
                                        <td> {product.productName}</td>
                                        <td> {product.productPrice}</td>
                                        <td>
                                            <button onClick={() => this.edituser(product.id)} className="btn btn-info">Update </button>
                                            <button style={{marginLeft: "10px"}} onClick={() => this.deleteuser(product.producId)} className="btn btn-danger">Delete </button>
                                            <button style={{marginLeft: "10px"}} onClick={() => this.viewuser(product.producId)} className="btn btn-info">View </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
        );
    }
}

export default ListProducts;

