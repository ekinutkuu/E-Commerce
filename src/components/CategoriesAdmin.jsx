import React, {Component} from 'react';
import CategoryService from '../services/CategoryService';
import JwtService from '../services/JwtService';

class CategoriesAdmin extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            isAdmin: false,
            loading: true
        }

        this.addCategories = this.addCategories.bind(this);
        this.editCategories = this.editCategories.bind(this);
        /* this.deleteCategories = this.deleteCategories.bind(this); */
    }

    componentDidMount(){
        const isAdmin = JwtService.getRoles().includes("ADMIN");
        this.setState({ isAdmin, loading: false });

        if (isAdmin) {
            CategoryService.getCategories()
                .then((res) => {
                    this.setState({ categories: res.data });
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching categories:", error);
                });
        }
    }

/*     deleteCategories(id){
        productService.deleteProduct(id).then( res => {
            this.setState({products: this.state.products.filter(product => product.productId !== id)});
        });
    } */

    editCategories(id){
        this.props.history.push(`/add-category/${id}`);
    }

    addCategories(){
        this.props.history.push('/add-category/_add');
    }

    render() {
        document.title = "Category Admin";

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
                <h2 className="text-center" style={{margin: "20px 0"}}>Category List</h2>
                <div className = "row">
                    <button className="btn btn-primary" onClick={this.addCategories}> Add Category </button>
                </div>
                <br></br>
                <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Category ID </th>
                                    <th> Category Name </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.categories.map(
                                        category => 
                                        <tr key = {category.id}>
                                            <td> {category.id} </td>
                                            <td> {category.categoryName}</td>
                                            <td>
                                                <button onClick={ () => this.editCategories(category.id)} className="btn btn-info"> Update </button>
{/*                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteproduct(category.id)} className="btn btn-danger"> Delete </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.viewproduct(category.id)} className="btn btn-info">View </button> */}
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

export default CategoriesAdmin