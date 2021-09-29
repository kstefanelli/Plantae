import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Plants for Cat People</h1>
    <nav>
      {isLoggedIn ? (
        <h4>
          {/* The navbar will show these links after you log in */}
          <Link to="/products">Plants</Link>
          <Link to="/users">Users</Link>
           <Link to="/order">Orders</Link>
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </h4>
      ) : (
        <h4>
          {/* The navbar will show these links before you log in */}
          <Link to="/products">Plants</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link> 
        </h4>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
