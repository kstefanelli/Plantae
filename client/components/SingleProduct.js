import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct, updateProduct } from "../store/singleProduct";
import { setSingleOrder } from "../store/singleOrder";
import { Link } from "react-router-dom";

export class SingleProduct extends React.Component {
 constructor (props) {
  super(props)
  this.state = {
    name: "",
    description: "",
    price : "",
    inventory: ""
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
}

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProduct(id);
  }

  componentDidUpdate(prevProps){
    if (prevProps.product !== this.props.product){
      this.setState({
        name: this.props.product.name,
        description: this.props.product.description,
        price: this.props.product.price,
        inventory: this.props.product.inventory
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = this.props.match.params.id
    this.props.updateProduct(id, {...this.state});
  }
  render() {
    const productName = this.props.product.name || "";
    const description = this.props.product.description || "";
    const imageUrl = this.props.product.imageURL || "";
    const price = this.props.product.price || "";
    const inventory = this.props.product.inventory || "";
    const handleSubmit = this.handleSubmit
    const handleChange = this.handleChange

    return (
      <div>
        <h3>{productName}</h3>
        <img src={imageUrl} />
          {description} <br />
          Price: ${price / 100} <br />
          {this.props.isAdmin ? (
            <div>
              Inventory: {inventory}
              <form onSubmit={handleSubmit}>
                <label htmlFor = "name"> Name:</label>
                <input name = "name" value={this.state.name} onChange={handleChange} /> <br />
                <label htmlFor = "description">Description</label>
                <input name = "description" value={this.state.description} onChange={handleChange} /> <br />
                <label htmlFor = "price">Price</label>
                <input name = "price" value={this.state.price} onChange={handleChange} /> <br />
                <label htmlFor = "inventory">Inventory</label>
                <input name = "inventory" value={this.state.inventory} onChange={handleChange} /> <br />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : (
            // {/* need to make sure this is set up with order routes/state something like onClick = {this.addToOrder(this.props.match.params.id)} , put request to set req.body to include orderId*/}
            <button >ADD TO CART <Link to={`/order/${this.props.product.id}`}></Link>
            </button>
          )
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.singleProduct,
    // singleOrder: state.singleOrder
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin

  };
};
// think we need somewhere that houses/updates cart items to specific orders, but not sure where.
const mapDispatchToProps = (dispatch, { history }) => ({
  getProduct: (productId) => dispatch(fetchSingleProduct(productId)),
  updateProduct: (productId, product) => dispatch(updateProduct(productId, product, history))
  // addToOrder: (productId) => dispatch(setSingleCartItem(productId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
