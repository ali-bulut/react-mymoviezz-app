import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import { HashLoader } from "react-spinners";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import MoviesList from "../../components/MoviesList";

import { fetchMoviesByAdmin } from "../../actions/movies-actions";

class OwnMovies extends Component {
  state = { modalOpen: true };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
      this.setState({ modalOpen: false })
        this.props.history.push('/addmovie');
    };

  componentDidMount() {
    const storedData = JSON.parse(localStorage.getItem("adminData"));
    console.log(storedData.adminId);
    this.props.fetchMoviesByAdmin(storedData.adminId);
  }

  render() {
    return (
      <div>
        {!this.props.movies || this.props.movies.length === 0 ? (
          <Modal
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header icon="browser" content="Henüz Eklenmiş Bir Filminiz Yok" />
            <Modal.Content>
              <h3>
                Hemen Yeni Bir Film Eklemek İçin Tıklayın...
              </h3>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={this.handleClose} inverted>
                <Icon name="checkmark" /> Film Ekle
              </Button>
            </Modal.Actions>
          </Modal>
        ) : null}
        {this.props.fetching ? (
          <HashLoader
            color={"#36bdb3"}
            size={40}
            loading={this.props.fetching}
          />
        ) : (
          <MoviesList isAdmin={true} movies={this.props.movies} />
        )}
        {/* {this.props.movies.length === 0 || !this.props.movies ? <p>Film yOK</p> :   */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.data.fetching,
    movies: state.data.movies,
  };
};

const mapDispatchToProps = {
  fetchMoviesByAdmin,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnMovies));
