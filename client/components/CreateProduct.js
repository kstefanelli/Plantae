import React from "react";
import { connect } from "react-redux";
import { createNewProduct } from '../store/product'
import { Link } from "react-router-dom";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price : "",
      inventory: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct({...this.state});
    this.setState({
      name: "",
      description: "",
      price : "",
      inventory: ""
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { name, description, price, inventory} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>ADD NEW PRODUCT</h1>
        <label htmlFor = "name"> Name:</label>
        <input name = "name"value={name} onChange={this.handleChange} />
        <br />
        <label htmlFor = "description">Description:</label>
        <input name = "description" value={description} onChange={this.handleChange} />
        <br />
        <label htmlFor = "price">Price</label>
        <input name = "price" value={price} onChange={this.handleChange} />
        <br />
        <label htmlFor = "inventory">Inventory</label>
        <input name = "inventory" value={inventory} onChange={this.handleChange} />
        <br />
        <button type="submit">Submit</button>
        <Link to = "/">Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createProduct: (product) => dispatch(createNewProduct(product, history))
});

export default connect(null, mapDispatchToProps)(CreateProduct);
