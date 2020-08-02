import React from "react";
import { Badge, Icon, Popover } from "antd";
import { connect } from "react-redux";
import {
  addToCartToolkit,
  addToCart,
  removeFromCart,
  removeFromCartToolkit
} from "../state/shop";

import "./ShoppingCart.css";

const duplicatedEntries = (accu, curr) => {
  return { ...accu, [curr.title]: (accu[curr.title] || 0) + 1 };
};

const productsWithoutDuplicates = (accu, curr) => {
  return accu.includes(curr) ? accu : [...accu, curr];
};

const ShoppingCartContent = ({ products, addToCart, removeFromCart }) => (
  <div>
    <ul className="shopping-cart-content__list">
      {products.reduce(productsWithoutDuplicates, []).map(product => (
        <li key={product.id}>
          {product.title} -
          <Icon
            type="plus"
            className="shoppin-cart-content__icon"
            onClick={() => addToCart(product)}
          />
          {products.reduce(duplicatedEntries, {})[product.title]}
          <Icon
            type="minus"
            className="shoppin-cart-content__icon"
            onClick={() => removeFromCart(product.id)}
          />
        </li>
      ))}
    </ul>
  </div>
);

export const ShoppingCart = ({ products = [], addToCart, removeFromCart }) => (
  <div className="shopping-cart__container">
    <Popover
      placement="bottomRight"
      content={
        <ShoppingCartContent
          products={products}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      }
    >
      <Badge count={products.length} showZero>
        <Icon type="shopping-cart" className="shopping-cart__icon" />
      </Badge>
    </Popover>
  </div>
);

const mapStateToProps = ({ shop }) => ({
  products: shop.products
});

const mapDispatchToProps = {
  addToCart,
  addToCartToolkit,
  removeFromCart,
  removeFromCartToolkit
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
