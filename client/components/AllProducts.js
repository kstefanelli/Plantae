import React from "react";
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/product";
//need to add route to app.js

export class AllProducts extends React.Component {

  componentDidMount(){
    this.props.getProducts();
    console.log(this.props.products)
  }

  render() {
    const products = this.props.products || []
    console.log(this.props)
    return (
    <div>
      <h3>PRODUCT LIST</h3>
      <div>
        {products.map((product) => {
          return (
            <div key = {product.id}>
            <img src = {product.imageURL}/>
            <h5>
                    <Link to = {`/products/${product.id}`}>{product.name}</Link>
                  </h5>
            </div>
          )
        })}
      </div>
    </div>)
  }
};


const mapStateToProps = (state) => {
  return {
    products: state.product
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
