import React, { Component } from 'react'
import productService from '../services/ProductService';
import Popup from "./Popup";

class CreateProductComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            //step 2
            id: this.props.match.params.id,
            productName: '',
            productPrice: '',
            seller: '',
            description: '',
            category: {
                id: '',
                categoryName: ''
            },
            categories: [],
            showPopup: false
        }

        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.changeProductPriceHandler = this.changeProductPriceHandler.bind(this);
        this.changeProductSellerHandler = this.changeProductSellerHandler.bind(this);
        this.changeProductDescriptionHandler = this.changeProductDescriptionHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }

    // step 3
    componentDidMount(){
        this.fetchCategories();

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            productService.getProductById(this.state.id).then((res) => {
                let product = res.data;
                this.setState({
                    productName: product.productName,
                    productPrice: product.productPrice,
                    seller: product.productSeller,
                    description: product.productDescription,
                    category: {
                        id: product.category.id,
                        categoryName: product.category.categoryName
                    }
                });
            });
        }      
    }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();

        const { productName, productPrice, seller, description, category } = this.state;

        if (!productName || !productPrice || !seller || !description || !category.id) {
            console.log('Missing Values!');
            this.setState({ showPopup: true });
            return;
        }

        let product = {
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            productSeller: this.state.seller,
            productDescription: this.state.description,
            category: {
                id: this.state.category.id,
                categoryName: null
            }
        };
        console.log('product => ' + JSON.stringify(product));

        // step 5
        if(this.state.id === '_add'){
            productService.createProduct(product).then(res =>{
                this.props.history.push('/admin/products');
            });
        }else{
            productService.updateProduct(product, this.state.id).then( res => {
                this.props.history.push('/admin/products');
            });
        }
    }

    fetchCategories = () => {
        productService.getCategories().then((res) => {
            this.setState({ categories: res.data });
        });
    }

    changeProductNameHandler = (event) => {
        this.setState({productName: event.target.value});
    }

    changeProductPriceHandler = (event) => {
        this.setState({productPrice: event.target.value});
    }

    changeProductSellerHandler = (event) => {
        this.setState({seller: event.target.value});
    }

    changeProductDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    changeCategoryHandler = (event) => {
        this.setState({category: event.target.value});
    }

    changeCategoryHandler = (event) => {
        const selectedCategory = this.state.categories.find(category => category.id === parseInt(event.target.value));
        this.setState({
            category: {
                id: selectedCategory.id,
                categoryName: selectedCategory.categoryName
            }
        });
    }

    cancel(){
        this.props.history.push('/admin/products');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Products</h3>
        }else{
            return <h3 className="text-center">Update Products</h3>
        }
    }

    render() {
        document.title = "Create Product";
        const { category, categories, showPopup } = this.state;
        return(
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
                                        <label> Name: </label>
                                        <input placeholder="Product Name" name="productName" className="form-control" 
                                            value={this.state.productName} onChange={this.changeProductNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Price: </label>
                                        <input placeholder="Product Price" name="productPrice" className="form-control" 
                                            value={this.state.productPrice} onChange={this.changeProductPriceHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Seller: </label>
                                        <input placeholder="Product Seller" name="seller" className="form-control" 
                                            value={this.state.seller} onChange={this.changeProductSellerHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Description: </label>
                                        <input placeholder="Product Description" name="description" className="form-control" 
                                            value={this.state.description} onChange={this.changeProductDescriptionHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Category: </label>
                                            <select value={category.id} onChange={this.changeCategoryHandler} name="category" className="form-control">
                                                <option value="">Select a Category</option>
                                                {categories.map(category => (
                                                    <option value={category.id} key={category.id}>{category.categoryName}</option>
                                                ))}
                                            </select>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
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

export default CreateProductComponent