import React from "react";
import { connect } from "react-redux";
// import { fetchCurrentOrder, removeItem } from "../store/singleOrder";
import { Link } from "react-router-dom";
import {
  updateUserOrder,
  removeItem,
  fetchActiveCart,
  checkout,
} from "../store/userOrder";

export class CurrentOrder extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const userId = this.props.auth.id;
    this.props.getOrder(userId);
    console.log("this props ", this.props);
  }

  componentDidUpdate(prevProps) {
    console.log("PREV", prevProps.activeCart);
    console.log("CURRENT", this.props.activeCart);
    if (prevProps !== this.props) {
      this.props.getOrder(this.props.auth.id);
    }
  }

  handleChange(evt, productId) {
    evt.preventDefault();
    const quantity = evt.target.value;
    const userId = this.props.auth.id;
    const cartId = this.props.activeCart.id;
    this.props.updateUserOrder(productId, userId, cartId, quantity);
    // this.props.getOrder(this.props.auth.id);
  }

  render() {
    const orderId = this.props.activeCart.id || "";
    const price = this.props.activeCart.totalPrice || 0;
    const status = this.props.activeCart.orderStatus || "";
    const products = this.props.activeCart.products || [];
    const userId = this.props.auth.id || 0;
    let runningTotal = 0;

    return (
      <div>
        <div>
          <h3>YOUR CART</h3>
          <div>
            {products.map((item, index) => {
              const price = (item.price / 100) * item.CartItem.quantity;
              runningTotal += price;
              return (
                <div key={index}>
                  <h5>
                    <Link to={`/products/${item.id}`}>
                      <img src={item.imageURL} /> <br />
                      {item.name}
                    </Link>
                  </h5>
                  <h5>Price ${price.toFixed(2)} </h5>
                  <h5>Quantity {item.CartItem.quantity} </h5>
                  <select onChange={(evt) => this.handleChange(evt, item.id)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>

                  <button
                    onClick={() => this.props.removeItem(userId, item.id)}
                  >
                    Remove From Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <p>
          SUBTOTAL: ${runningTotal.toFixed(2)} <br />
        </p>
        <a
          href="/confirmationPage"
          onClick={() => this.props.confirmationPage(userId, orderId)}
        >
          Checkout
        </a>
      </div>
    );
  }
}

// const confirmationPage = () => {
//   //need to add functionality - needs to submit the order and change orderStatus to "FULFILLED"

// };

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    activeCart: state.activeCart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getOrder: (userId) => dispatch(fetchActiveCart(userId)),
  removeItem: (userId, productId) => dispatch(removeItem(userId, productId)),
  updateUserOrder: (productId, userId, cartId, quantity) =>
    dispatch(updateUserOrder(productId, userId, cartId, quantity)),
  confirmationPage: (userId, cartId) => dispatch(checkout(userId, cartId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOrder);
