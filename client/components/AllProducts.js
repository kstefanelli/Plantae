import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, deleteSingleProduct } from "../store/product";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const products = this.props.products || [];
    return (

      <div>
      {this.props.isLoggedIn ? (
            products.map((product) => {
              return (
                <div className="title-products" key = {product.id}>
                  <div className="all-products" >
                    <img src = {product.imageURL}/>
                    <h5>
                      <Link to = {`/products/${product.id}`}>{product.name} ${product.price / 100}</Link>
                    </h5>
                    <button type="button" className ="btn btn-primary" onClick = {() => {this.props.deleteProduct(product.id)}}>X</button>
                  </div>
                </div>
                )
              })
              ) : (
        products.map((product) => {
          return (
            <div className="title-products" key = {product.id}>
                  <div className="all-products" >
                    <img src = {product.imageURL}/>
                    <h5>
                      <Link to = {`/products/${product.id}`}>{product.name} ${product.price / 100}</Link>
                    </h5>
                  </div>
                </div>
          )}))
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  getProducts: () => dispatch(fetchProducts()),
  deleteProduct: (productId) =>
    dispatch(deleteSingleProduct(productId, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
