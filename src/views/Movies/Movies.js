import React from "react";
import { connect } from "react-redux";
import { Layout, Typography, Input, Select, Button, Spin } from "antd";
import { Box } from "../../components/Box";
import { getMovies, addMovies } from "../../state/movies";

import "./Movies.css";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;


class Movies extends React.Component {
  state = {
    title: '',
    selected: 'Action'
  };

  handleInput = (e) => {
    const title = e.target.value
    this.setState({
      title: title
    })

  }

  handleSelect = (genre) => {
    this.setState({
      selected: genre
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {title, selected} = this.state
    this.props.addMovies({title, selected});
  }

  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    const {movies, loading, error, adding} = this.props
    return (
      <Content className="movies_content" >
        <Box className="movies__box">
          <Title> Movies list </Title>
          <form className="movies__form" onSubmit={this.handleSubmit}>
            <Input placeholder="Title" className="spacing-bottom--normal" onChange={this.handleInput} value={this.state.title} />
            <Select defaultValue={this.state.selected} onChange={this.handleSelect} className="spacing-bottom--normal">
              <Select.Option value="Drama">Drama</Select.Option>
              <Select.Option value="Action">Action</Select.Option>
              <Select.Option value="Comedy">Comedy</Select.Option>
              <Select.Option value="Horror">Horror</Select.Option>
            </Select>
            <Button htmlType="submit" type="primary" loading={adding}>Add</Button>
          </form>
          {loading && <Spin />}
          {error && <Text type="danger">{error}</Text>}

          <div>
            <ul className="movies__list">
              {movies.map(movie => (
                <li key={movie.id} className="spacing-bottom--normal" >
                  <Text>{movie.title}</Text>
                  {" - "}
                  <Text strong>{movie.genre}</Text>
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.moviesReducer.movies,
  loading: state.moviesReducer.loading,
  error: state.moviesReducer.error,
  adding: state.moviesReducer.adding
});

const mapDispatchToProps = {
  getMovies,
  addMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
