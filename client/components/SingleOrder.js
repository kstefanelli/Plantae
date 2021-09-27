import React from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store/singleOrder";
import { Link } from "react-router-dom";

export class SingleOrder extends React.Component {
  componentDidMount() {
    const userId = this.props.auth.id;
    const orderId = this.props.match.params.orderId;
    this.props.getOrder(userId, orderId);
  }

  render() {
    const orderId = this.props.order.id || "";
    const price = this.props.order.totalPrice || 0;
    const status = this.props.order.orderStatus || "";
    const products = this.props.order.products || [];

    return (
      <div>
        <h3>ORDER {orderId} </h3>
        <div>
          CART ITEMS:
          <div>
            {products.map((item) => {
              return (
                <div key={item.id}>
                  <h5>
                    <Link to={`/products/${item.id}`}>
                      <img src={item.imageURL} /> <br />
                      {item.name}
                    </Link>
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
        <p>
          TOTAL PRICE: ${price} <br />
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.singleOrder,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getOrder: (userId, orderId) => dispatch(fetchSingleOrder(userId, orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
