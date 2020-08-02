import React from "react";
import { connect } from "react-redux";
import { Layout, Button, Typography } from "antd";
import { Box } from "../../components/Box";
import {increment, decrement, reset, asyncIncrement } from "../../state/counter";
import "./Counter.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Counter = ({increment, decrement, reset, counter, asyncIncrement}) => {
  return (
    <Content className="counter_content">
      <Box>
        <Title> Welcome to Counter</Title>
        <Paragraph strong className="counter_text"> Current count: {counter} </Paragraph>
        <Paragraph>
          <Button type="primary" className="counter_button" onClick={increment} > Increment </Button>
          <Button type="primary" className="counter_button" onClick={asyncIncrement} > Async increment </Button>
          <Button type="danger" className="counter_button" onClick={decrement} > Decrement </Button>
          <Button onClick={reset} > Reset </Button>
        </Paragraph>
      </Box>
    </Content>
  );
};

// Pobieramy pożądany kawałek stanu
const mapStateToProps = (state) => ({
  counter: state.counter
})

// Dajemy możliwość wysyłania(dispatchowania) akcji z komponentu
const mapDispatchToProps = {
  increment,
  asyncIncrement,
  decrement,
  reset
}

// Dzięki export default nie musimy wymyślać nowej nazwy dla Countera, który jest podłączony do store'a
export default connect(mapStateToProps, mapDispatchToProps)(Counter)