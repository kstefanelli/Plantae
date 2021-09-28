import React from "react";
import { connect } from "react-redux";
// import { fetchCurrentOrder, removeItem } from "../store/singleOrder";
import { Link } from "react-router-dom";
import {
  updateUserOrder,
  removeItem,
  fetchActiveCart,
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

  handleChange(evt, productId) {
    evt.preventDefault();
    const quantity = evt.target.value;
    const userId = this.props.auth.id;
    const cartId = this.props.activeCart.id;
    this.props.udpateUserOrder(productId, userId, cartId, quantity);
  }

  render() {
    const orderId = this.props.activeCart.id || "";
    const price = this.props.activeCart.totalPrice || 0;
    const status = this.props.activeCart.orderStatus || "";
    const products = this.props.activeCart.products || [];
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    activeCart: state.activeCart,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getOrder: (userId) => dispatch(fetchActiveCart(userId)),
  removeItem: (userId, productId) => dispatch(removeItem(userId, productId)),
  udpateUserOrder: (productId, userId, cartId, quantity) =>
    dispatch(updateUserOrder(productId, userId, cartId, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOrder);
