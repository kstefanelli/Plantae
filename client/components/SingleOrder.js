import React from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store/singleOrder";

export class SingleOrder extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getOrder(id);
  }

  render() {
    // const orderId = this.props.order.id || "";
    return (
      <div>
        <h3>SINGLE ORDER</h3>
        <h3>{this.props.order}</h3>
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
