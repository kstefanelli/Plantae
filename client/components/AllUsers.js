import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../store/user";

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const users = this.props.users || [];
    return (
      <div>
        <h2 id="title-users">USERS</h2>
        {users.length
          ? users.map((user) => {
              return (
                <div className="all-users" key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    <div> Username: {user.username}</div>
                    <div> Email: {user.email}</div>
                  </Link>
                </div>
              );
            })
          : "No users in database."}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
