import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/product";
import { fetchActiveCart } from "../store/userOrder";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
    console.log("STATEAUTH", this.props.userId)
    this.props.getActiveCart(this.props.userId)
  }

  render() {
    const products = this.props.products || [];
    return (
      <div>
            {products.map((product) => {
              return (
                <div className="all-products" key={product.id}>
                  <div >
                    <h4>
                      <Link to = {`/products/${product.id}`}>
                      <img src = {product.imageURL}/>
                        {product.name} - ${product.price / 100
                        }</Link>
                    </h4>
                  </div>
                </div>
                )
              })
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("STATE", state)
  return {
    products: state.product,
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  getProducts: () => dispatch(fetchProducts()),
  getActiveCart: (userId) => dispatch(fetchActiveCart(userId))
  // getActiveCart: () => console.log("USERID in GETACTIVECART", this.props.userId)
});

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
