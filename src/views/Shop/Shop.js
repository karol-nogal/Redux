import React, { useEffect, useState } from "react";
import { Layout, Typography, Card, Icon } from "antd";
import { Box } from "../../components/Box";
import "./Shop.css";
import Axios from "axios";
import { connect } from "react-redux";
import { addToCart, addToCartToolkit } from "../../state/shop";
const { Content } = Layout;
const { Title } = Typography;

const URL = "http://localhost:3000/products";

export const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(URL).then(({ data }) => setProducts(data));
  }, []);

  return (
    <Content className="shop_content">
      <Box className="shop__box">
        <Title> Shop </Title>
        {products.map(product => {
          return (
            <Card
              key={product.id}
              onClick={() => addToCart(product)}
              style={{
                width: "240px",
                display: "inline-block",
                margin: "16px"
              }}
              cover={
                <img
                  alt={product.title}
                  src={product.img}
                  style={{ maxHeight: "200px" }}
                />
              }
            >
              <Card.Meta title={product.title} />
            </Card>
          );
        })}
      </Box>
    </Content>
  );
};

const mapDispatchToProps = {
  addToCart,
  addToCartToolkit
};

export default connect(null, mapDispatchToProps)(Shop);
