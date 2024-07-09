import React, {Component} from 'react';
import productService from '../services/ProductService'

class ViewProductAdminComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            product: {}
        }
    }

    componentDidMount() {
        productService.getProductById(this.state.id).then( res => {
            this.setState({product: res.data});
            console.log(res.data);
        });
    }
    render() {
        document.title = "View Product Details";
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Product Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Product ID: </label>
                            <div> { this.state.product.productId }</div>
                        </div>
                        <div className = "row">
                            <label> Name: </label>
                            <div> { this.state.product.productName }</div>
                        </div>
                        <div className = "row">
                            <label> Price: </label>
                            <div> { this.state.product.productPrice }</div>
                        </div>
                        <div className = "row">
                            <label> Seller: </label>
                            <div> { this.state.product.productSeller }</div>
                        </div>
                        <div className = "row">
                            <label> Description: </label>
                            <div> { this.state.product.productDescription }</div>
                        </div>
                        <div className = "row">
                            <label> Category ID: </label>
                            <div> { this.state.product.category?.id }</div>
                        </div>
                        <div className = "row">
                            <label> Category Name: </label>
                            <div> { this.state.product.category?.categoryName }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewProductAdminComponent