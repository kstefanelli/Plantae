import React from "react";
import {connect} from 'react-redux'
import { fetchSingleProduct } from "../store/singleProduct"

export class SingleProduct extends React.Component {

  componentDidMount(){
    const id = this.props.match.params.id
    this.props.getProduct(id)
    console.log(this.props)
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
            {description} <br />
            Price: ${price/100} <br />
      </p>
    </div>
  );
}}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
 }
}

const mapDispatchToProps = (dispatch) => ({
  getProduct: (productId) => dispatch(fetchSingleProduct(productId))
  });

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
