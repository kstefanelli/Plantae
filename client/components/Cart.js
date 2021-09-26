import React from "react";
import { connect } from "react-redux";
import { fetchCurrentOrder } from "../store/singleOrder";
import ConfirmationPage from "./ConfirmationPage";
import { Link } from "react-router-dom";
import history from "../history";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";

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
        <a href="/confirmationPage" onClick={confirmationPage}>
          Checkout
        </a>
        {/* onclick, go to ConfirmationPage component */}
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
    order: state.singleOrder,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getOrder: (userId) => dispatch(fetchCurrentOrder(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOrder);
