import React, { Component } from "react";
import { connect } from "react-redux";
import MoviesList from "../../components/MoviesList";
import {HashLoader} from 'react-spinners';

import { fetchMovies } from "../../actions/movies-actions";

class HomePage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchMovies();
  }
 
  render() {
    return (
      <div>
        {this.props.fetching ?
        <HashLoader color={"#36bdb3"} size={40} loading={this.props.fetching} /> :
        <MoviesList movies={this.props.movies} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.data.movies,
    movie: state.data.movie,
    fetching:state.data.fetching
  };
};

const mapDispatchToProps = {
  fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
