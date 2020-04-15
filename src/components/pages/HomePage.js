import React, { Component } from "react";
import { connect } from "react-redux";
import MoviesList from "../../components/MoviesList";

import { fetchMovies } from "../../actions/movies-actions";

class HomePage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchMovies();
  }
  render() {
    return (
      <div>
        <MoviesList movies={this.props.movies} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.data.movies,
  };
};

const mapDispatchToProps = {
  fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
