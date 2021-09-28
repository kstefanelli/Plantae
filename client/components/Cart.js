import React from "react";
import { connect } from "react-redux";
import { fetchCurrentOrder, removeItem } from "../store/singleOrder";
import { Link } from "react-router-dom";

export class CurrentOrder extends React.Component {
  componentDidMount() {
    const userId = this.props.auth.id;
    this.props.getOrder(userId);
  }
  componentDidUpdate(prevProps) {
    if (this.props.order.products === prevProps.order.products) {
      this.props.getOrder(this.props.auth.id);
    }
  }

  render() {
    const orderId = this.props.order.id || "";
    const price = this.props.order.totalPrice || 0;
    const status = this.props.order.orderStatus || "";
    const products = this.props.order.products || [];
    const userId = this.props.auth.id;

    return (
      <div>
        <h3>ORDER {orderId} </h3>
        <div>
          CART ITEMS:
          <div>
            {products.map((item, index) => {
              return (
                <div key={index}>
                  <h5>
                    <Link to={`/products/${item.id}`}>
                      <img src={item.imageURL} /> <br />
                      {item.name}
                    </Link>
                  </h5>

                  <button onClick={addQuantity}>Add Quantity</button>
                  <button onClick={subtractQuantity}>Subtract Quantity</button>
                  <button
                    onClick={() =>
                      this.props.removeItem(userId, item.CartItem.productId)
                    }
                  >
                    Remove From Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <p>
          TOTAL PRICE: ${price} <br />
          ORDER STATUS: {status} <br />
        </p>
        <a href="/confirmationPage" onClick={confirmationPage}>
          Checkout
        </a>
      </div>
    );
  }
}

const confirmationPage = () => {
  //need to add functionality - needs to submit the order and change orderStatus to "FULFILLED"
  console.log("Clicked");
};

const addQuantity = () => {
  console.log("Add");
};
const subtractQuantity = () => {
  console.log("Subtract");
};

const mapStateToProps = (state) => {
  return {
    order: state.singleOrder,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getOrder: (userId) => dispatch(fetchCurrentOrder(userId)),
  removeItem: (userId, cartItemId) => dispatch(removeItem(userId, cartItemId)),
  // addQuantity: ()
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOrder);
