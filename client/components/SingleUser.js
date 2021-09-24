import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/singleUser";

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.userId);
  }

  render() {
    const username = this.props.user.username || "";
    const email = this.props.user.email || "";
    return (
      <div id="single-user">
        <h2 id="title-users">USER</h2>
        <div> Username: {username} </div>
        <div> Email: {email}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userId) => dispatch(fetchUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
