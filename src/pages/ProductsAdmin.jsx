import React, { Component } from 'react'
import productService from '../services/ProductService'
import jwtService from '../services/JwtService'

class ProductsAdmin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products: [],
            isAdmin: false,
            loading: true
        }

        this.addProduct = this.addProduct.bind(this);
        this.editproduct = this.editproduct.bind(this);
        this.deleteproduct = this.deleteproduct.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    deleteproduct(id){
        productService.deleteProduct(id).then( res => {
            this.setState({products: this.state.products.filter(product => product.productId !== id)});
        });
    }

    viewproduct(id){
        this.props.history.push(`/view-product/${id}`);
    }

    editproduct(id){
        this.props.history.push(`/add-product/${id}`);
    }

    componentDidMount(){
        const isAdmin = jwtService.getRoles().includes("ADMIN");
        this.setState({ isAdmin, loading: false });

        if (isAdmin) {
            productService.getProducts().then((res) => {
                this.setState({ products: res.data});
                console.log(res.data);
            })
        }
    }

    addProduct(){
        this.props.history.push('/add-product/_add');
    }

    render() {
        document.title = "Product Management";

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
                <h2 className="text-center" style={{margin: "20px 0"}}>Products List</h2>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.addProduct}> Add Product </button>
                </div>
                <br></br>
                <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Product ID </th>
                                    <th> Name </th>
                                    <th> Price </th>
                                    <th> Seller </th>
                                    <th> Description </th>
                                    <th> Category </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product => 
                                        <tr key = {product.id}>
                                            <td> {product.productId} </td>
                                            <td> {product.productName}</td>
                                            <td> {product.productPrice} </td>
                                            <td> {product.productSeller} </td>   
                                            <td> {product.productDescription}</td>
                                            <td> {product.category.categoryName} </td>
                                            <td>
                                                <button onClick={ () => this.editproduct(product.productId)} className="btn btn-info"> Update </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteproduct(product.productId)} className="btn btn-danger">Delete </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.viewproduct(product.productId)} className="btn btn-info">View </button>
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

export default ProductsAdmin
