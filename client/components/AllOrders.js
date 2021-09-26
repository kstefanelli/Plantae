import React from "react";
import { connect } from "react-redux";
import { fetchAllOrders } from "../store/order";
import { Link } from "react-router-dom";

export class AllOrders extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
  }

  render() {
    const orders = this.props.orders || [];
    const userId = this.props.auth.id;
    return (
      <div>
        <h3>Orders</h3>
        <div>
          {orders.map((order) => {
            return (
              <div key={order.id}>
                <Link to={`/order/${userId}/${order.id}`}>
                  <h3>ORDER NUMBER: {order.id}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllOrders: () => dispatch(fetchAllOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
