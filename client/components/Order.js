import React from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store/order";

export class Order extends React.Component {
  // componentDidMount() {
  //   this.props.loadInitialData();
  //   const id = this.props.match.params.id;
  //   this.props.getOrder(id);
  // }

  //   render() {
  //     const orderId = this.props.order.id || "";
  //     return (
  //       <div>
  //         <h3>{orderId}</h3>
  //       </div>
  //     );
  //   }
  // }

  render() {
    return <div>Single Order page</div>;
  }
}

// const mapStateToProps = (state) => {
//   return {
//     order: state.singleOrder,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   getOrder: (userId) => dispatch(fetchSingleOrder(userId)),
//   loadInitialData: () => dispatch(me()),
// });

export default Order;
//export default connect(mapStateToProps, mapDispatchToProps)(Order)
