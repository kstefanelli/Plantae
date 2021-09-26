import React from "react";
import { connect } from "react-redux";
import { fetchCurrentOrder } from "../store/singleOrder";

export class CurrentOrder extends React.Component {
  componentDidMount() {
    const userId = this.props.auth.id;
    this.props.getOrder(userId);
  }

  render() {
    const orderId = this.props.order.id || "";
    const price = this.props.order.totalPrice || "";
    const status = this.props.order.orderStatus || "";
    return (
      <div>
        <h3>ORDER {orderId} </h3>
        <p>
          TOTAL PRICE: {price} <br />
          ORDER STATUS: {status}
          <br />
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
  getOrder: (userId) => dispatch(fetchCurrentOrder(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOrder);
