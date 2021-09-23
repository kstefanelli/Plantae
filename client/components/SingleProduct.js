import React from "react";
import {connect} from 'react-redux'
import product from "../store/product";
import { fetchSingleProduct } from "../store/singleProduct";

export class SingleProduct extends React.Component {

  componentDidMount(){
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }
  render() {
    const productName = this.props.product.name || "";
    const description = this.props.product.description || "";
    const imageUrl = this.props.product.imageURL || "";
    const price = this.props.product.price || "";

    return (
    <div>
      <h3>{productName}</h3>
      <img src = {imageUrl}/>
      <p>
            Name: {productName} <br />
            Description: {description} <br />
            Price: ${price/100} <br />
      </p>
    </div>
  );
}}

const mapStateToProps = (state) => {
  return {
    product: state.product,
 }
}

const mapDispatchToProps = (dispatch) => ({
  getProduct: (productId) => dispatch(fetchSingleProduct(productId)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
