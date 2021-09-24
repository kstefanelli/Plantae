import React from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store/singleOrder";

export class SingleOrder extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getOrder(id);
  }

  render() {
    const orderId = this.props.order.id || "";
    return (
      <div>
        <h3>ORDER {orderId}</h3>
        <p>
          TOTAL PRICE: {this.props.order.totalPrice} <br />
          ORDER STATUS: {this.props.order.orderStatus} <br />
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.singleOrder,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getOrder: (userId) => dispatch(fetchSingleOrder(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder);
