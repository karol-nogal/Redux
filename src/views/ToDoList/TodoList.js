import React, { useState } from "react";
import { List, Typography, Layout, Button, Input, Checkbox } from "antd";
import "./TodoList.css";
import { Box } from "../../components/Box";
import { connect } from "react-redux";
import { addTodo, toggleDone, removeSelected } from "../../state/todo";

/*
ToDo App jest w potrzebie!
Nie działa praktycznie nic, a ma działać wszystko i tak żeby było dobrze!!!

Czego oczekujemy od ToDo App?

* Dodawania todos
* Zaznaczania, że jest zrobiony
* Edycji
* Usuwan ia
* Wstępnej walidacji
*/

const TodoList = props => {
  const [data, setData] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  console.log(selectedIds);
  return (
    <Layout.Content className="todo_content">
      <Box style={{ width: "50%", margin: "0 auto" }}>
        <Typography.Title style={{ marginBottom: 16 }}>
          The One and only ToDo App
        </Typography.Title>
        <form
          onSubmit={e => {
            e.preventDefault();
            props.addTodo(data);
            setData("");
          }}
        >
          <Input
            placeholder="ToDo"
            onChange={e => {
              setData(e.target.value);
            }}
            value={data}
            style={{ marginBottom: "16px" }}
          />
          <Button
            type="primary"
            htmlType="submit"
            disabled={data.trim().length === 0}
            style={{ marginBottom: "16px" }}
          >
            Add
          </Button>
          <Button
            style={{ marginLeft: "8px" }}
            type="danger"
            onClick={() => {
              props.removeSelected(selectedIds);
              setSelectedIds([]);
            }}
          >
            DELETE SELECTED TODOS
          </Button>
        </form>
        <List
          dataSource={props.todos}
          renderItem={(item, index) => (
            <List.Item>
              <div className="todo_list-item">
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onChange={() => {
                    const checked = selectedIds.includes(item.id)
                      ? selectedIds.filter(id => id !== item.id)
                      : [...selectedIds, item.id];
                    setSelectedIds(checked);
                  }}
                />
                <Typography.Paragraph
                  strong
                  onClick={() => props.toggleDone(item.id)}
                  style={{ display: "inline-block", marginLeft: "8px" }}
                  className={item.isDone ? "todo_list-item--done" : undefined}
                >
                  {`${index + 1}. ${item.title}`}
                </Typography.Paragraph>
              </div>
            </List.Item>
          )}
        />
      </Box>
    </Layout.Content>
  );
};

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = {
  addTodo,
  toggleDone,
  removeSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
