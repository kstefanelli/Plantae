import React from "react";
import { connect } from "react-redux";
import { fetchAllOrders } from "../store/order";

export class AllOrders extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
    console.log("SHOULD BE ORDERS IN ALL ORDERS", this.props.orders);
  }

  render() {
    const orders = this.props.orders || [];
    return (
      <div>
        <h3>Orders</h3>
        <div>
          {orders.map((order) => {
            return <div key={order.id}>ORDER</div>;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllOrders: () => dispatch(fetchAllOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
