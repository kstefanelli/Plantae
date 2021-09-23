import React from "react";
import { connect } from "react-redux";
import { fetchSingleUser } from "../store/singleUser";

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.userId);
  }

  render() {
    const user = this.props.singleUser || {};
    console.log('this is user', user)
    return (
      <div id="single-user">
        <h2 id="title-users">USER</h2>
        <div> Username: {user.username} </div>
        <div> Email: {user.email}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleUser: state.singleUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleUser: (id) => dispatch(fetchSingleUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
