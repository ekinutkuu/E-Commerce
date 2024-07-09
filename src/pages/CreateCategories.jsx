import React, {Component} from 'react';
import Popup from "../components/Popup";
import CategoryService from "../services/CategoryService";

class CreateCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            categoryName: '',
            showPopup: false
        }

        this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
        this.saveOrUpdateProduct = this.saveOrUpdateProduct.bind(this);
    }

    componentDidMount(){
        if (this.state.id === '_add') {
            return
        } else {
            CategoryService.getCategoryById(this.state.id).then((res) => {
                let category = res.data;
                this.setState({
                    categoryName: category.categoryName,
                });
            });
        }      
    }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();

        const { categoryName } = this.state;

        if ( !categoryName ) {
            console.log('Missing Values!');
            this.setState({ showPopup: true });
            return;
        }

        let category = {
            categoryName: this.state.categoryName,
        };

        console.log('category => ' + JSON.stringify(category));

        if(this.state.id === '_add'){
            CategoryService.createCategory(category).then(res =>{
                this.props.history.push('/admin/categories');
            });
        }else{
            CategoryService.updateCategory(category, this.state.id).then( res => {
                this.props.history.push('/admin/categories');
            });
        }
    }

    changeCategoryNameHandler = (event) => {
        this.setState({categoryName: event.target.value});
    }

    cancel(){
        this.props.history.push('/admin/categories');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Category</h3>
        }else{
            return <h3 className="text-center">Update Category</h3>
        }
    }

    render() {
        document.title = "Create Product";
        const {  showPopup } = this.state;
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
                                        <input placeholder="Category Name" name="categoryName" className="form-control" 
                                            value={this.state.categoryName} onChange={this.changeCategoryNameHandler}/>
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

export default CreateCategories