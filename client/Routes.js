import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";

//Added components//
import AllProducts from "./components/AllProducts";
import AllUsers from "./components/AllUsers";
import Cart from "./components/Cart";
import Checkout from "./components/ConfirmationPage";
import SingleProduct from "./components/SingleProduct";
import SingleUser from "./components/SingleUser";
import SingleOrder from "./store/singleOrder";
import ConfirmationPage from "./components/ConfirmationPage";
import AllOrders from "./components/AllOrders"
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/users" component={AllUsers} />
            <Route exact path="/users/:userId" component={SingleUser} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/products" exact component={AllProducts} />
            <Route path="/order" exact component={AllOrders} />
            <Route path="/order/:id/:orderId" exact component={SingleOrder} />
            <Route path="/cart" exact component={Cart} />
            <Route
              path="/confirmationPage"
              exact
              component={ConfirmationPage}
            />
            <Redirect to="/"/>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/products" component={AllProducts} />
            <Route path="/order/:id/:orderId" component={SingleOrder} />
            <Route path="/cart"component={Cart} />
            <Route
              path="/confirmationPage"
              exact
              component={ConfirmationPage}
            />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
