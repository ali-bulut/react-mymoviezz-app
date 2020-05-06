import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MoviesList from "../../components/MoviesList";
import { HashLoader } from "react-spinners";
import { Pagination, Icon } from "semantic-ui-react";
import paginate from 'paginate-array';

import { fetchMovies } from "../../actions/movies-actions";
import { logout } from "../../actions/authentication-actions";

import checkExpire from "../../util/checkTokenExpire";

class HomePage extends Component {

  constructor(props){
    super(props);

    this.state = {
      numberOfMovies: 0,
      pageSize: 1,
      page: 1,
      currPage: null,
      moviePerPage: 1
    }
  }
  componentDidMount() {
    let numberOfMovies, pageSize, currPage;
    window.scrollTo(0, 0);
    this.props.fetchMovies().then(() => {
      numberOfMovies = this.props.movies.length;
      pageSize = numberOfMovies / this.state.moviePerPage;
      this.setState({
        pageSize
      })
      currPage = paginate(this.props.movies, this.state.page, this.state.moviePerPage )
      // console.log(currPage.data.map(movie => movie.name));
      this.setState({
        numberOfMovies,
        currPage
      })
    });
    
  }

  componentDidUpdate(prevProps, prevState) {
    checkExpire(this.props.logout);
  }

  

  render() {

    const pagee = (activePage) => {
      const newCurrPage = paginate(this.props.movies, activePage, this.state.moviePerPage)
      this.setState({
        ...this.state,
        page: activePage,
        currPage: newCurrPage
      })
    }

    const nextPage = () => {
      if (this.state.page < this.state.currPage.totalPages) {
      const newPage = this.state.page + 1;
      const newCurrPage = paginate(this.props.movies, newPage, this.state.moviePerPage)
      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      })
    }
    }

    const prevPage = () => {
      if(this.state.page > 1){

      const newPage = this.state.page - 1;
      const newCurrPage = paginate(this.props.movies, newPage, this.state.moviePerPage)
      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      })
    }
    }
    return (
      <div>
        {this.props.fetching || this.state.currPage === null ? (
          <HashLoader
            color={"#36bdb3"}
            size={40}
            loading={this.props.fetching}
          />
        ) : (
          <React.Fragment>
          <MoviesList movies={this.state.currPage.data} />
          <br/>
          <Pagination
          defaultActivePage={this.state.page}
          onPageChange={(event, data) => {pagee(data.activePage); }}
          totalPages={this.state.pageSize}
          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
          firstItem={{ content: <Icon name='angle double left' />, icon: true }}
          lastItem={{ content: <Icon name='angle double right' />, icon: true }}
          prevItem={{ content: <Icon name="angle left" />, icon: true, onClick: prevPage }}
          nextItem={{ content: <Icon name="angle right" />, icon: true, onClick: nextPage }}
        />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.data.movies,
    movie: state.data.movie,
    fetching: state.data.fetching,
  };
};

const mapDispatchToProps = {
  fetchMovies,
  logout,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
