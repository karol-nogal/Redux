import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import Counter from "./views/Counter/Counter";
import Todo from "./views/ToDoList/TodoList";
import { Box } from "./components/Box";
import Movies from "./views/Movies/Movies";
import Shop from "./views/Shop/Shop";
import ShoppingCart from "./components/ShoppingCart";

import "./App.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  return (
    <Content>
      <Box>
        <Title>Welcome To Redux App :) </Title>
      </Box>
    </Content>
  );
};

class App extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="counter">
                <Link to="/counter">Counter </Link>
              </Menu.Item>
              <Menu.Item key="todo">
                <Link to="/todo">TODO</Link>
              </Menu.Item>
              <Menu.Item key="movies">
                <Link to="/movies">Movies</Link>
              </Menu.Item>
              <Menu.Item key="shop">
                <Link to="/shop">Shop</Link>
              </Menu.Item>
              <ShoppingCart/>
            </Menu>
          </Header>

          <Switch>
            <Route path="/counter">
              <Counter />
            </Route>
            <Route path="/todo">
              <Todo />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
