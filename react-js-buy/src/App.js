import React, { Component } from 'react';
import Products from './components/Products';
import Cart from './components/Cart';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    };

    this.handleCartClose = this.handleCartClose.bind(this);
    this.addVariantToCart = this.addVariantToCart.bind(this);
    this.addVariantToCart = this.addVariantToWishlist.bind(this);
    this.removeVariantToCart = this.removeVariantToWishlist.bind(this);
    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
    this.reloadProducts = this.reloadProducts.bind(this);
  }

  componentWillMount() {
    this.props.client.checkout.create().then((res) => {
      this.setState({
        checkout: res,
      });
    });

    this.reloadProducts();

    this.props.client.shop.fetchInfo().then((res) => {
      this.setState({
        shop: res,
      });
    });
  }

  reloadProducts() {
    //this.props.client.collection.fetchAllWithProducts().then((collections) => {
    let collId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzMzMTk5NzE5NQ==";
    this.props.client.collection.fetchWithProducts(collId, {productsFirst: 21}).then((collections) => {
      let me = this;
      console.log(collections);
      let res = collections.products;
      window._swat.fetch(function(allWishlists){
        res.forEach(element => {
          var parts = atob(element.id).split("/");
          element.empi = parseInt(parts[parts.length - 1]);
          element.variants.forEach(v => {
            var vparts = atob(v.id).split("/");
            v.epi = parseInt(vparts[vparts.length - 1]);
          });
          element.InWishlist = !! (allWishlists.find(wItem => {
            return wItem.empi == element.empi;
          }));
        });
        me.setState({
          products: res,
        });
      });
    });
  }

  addVariantToCart(variantId, quantity){
    this.setState({
      isCartOpen: true,
    });

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  addVariantToWishlist(variant, product) {
    debugger;
    var wishlistMap = {
      epi: variant.epi,
      empi: product.empi,
      du: "https://demo.swym.it/products" + product.handle
    };
    let me = this;
    window._swat.addToWishList(wishlistMap, function(){
      //me.reloadProducts();
      //alert("Added to wishlist");
    });
  }

  removeVariantToWishlist(variant, product) {
    debugger;
    var wishlistMap = {
      epi: variant.epi,
      empi: product.empi,
      du: "https://demo.swym.it/products" + product.handle
    };
    let me = this;
    window._swat.removeFromWishList(wishlistMap, function(){
      //me.reloadProducts();
    });
  }

  updateQuantityInCart(lineItemId, quantity) {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart(lineItemId) {
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  handleCartClose() {
    this.setState({
      isCartOpen: false,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          {!this.state.isCartOpen &&
            <div className="App__view-cart-wrapper">
              <button className="App__view-cart" onClick={()=> this.setState({isCartOpen: true})}>Cart</button>
            </div>
          }
          <div className="App__title">
            <h1>{this.state.shop.name}: Headless</h1>
            <h2>{this.state.shop.description}</h2>
          </div>
        </header>
        <Products
          products={this.state.products}
          client={this.props.client}
          addVariantToCart={this.addVariantToCart}
          addVariantToWishlist={this.addVariantToWishlist}
        />
        <Cart
          checkout={this.state.checkout}
          isCartOpen={this.state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
      </div>
    );
  }
}

export default App;
