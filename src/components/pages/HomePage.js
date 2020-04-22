import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import MoviesList from "../../components/MoviesList";
import {HashLoader} from 'react-spinners';

import { fetchMovies } from "../../actions/movies-actions";
import {logout} from '../../actions/authentication-actions';

import checkExpire from '../../util/checkTokenExpire';

class HomePage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    checkExpire(this.props.logout);
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
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
