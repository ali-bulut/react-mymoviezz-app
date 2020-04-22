import React, { Component } from "react";
import { Form, Image } from "semantic-ui-react";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { editMovie } from "../../actions/movies-actions";
import {fetchMovieById} from '../../actions/movie-details-actions';
import { HashLoader } from "react-spinners";
import { Redirect } from "react-router-dom";

import {logout} from '../../actions/authentication-actions';

import checkExpire from '../../util/checkTokenExpire';

class AddMovie extends Component {
  state = {
    name: "",
    trailerUrl: "",
    genre: "",
    director: "",
    country: "",
    duration: "",
    imdb: "",
    publishedDate: "",
    downloadUrl: "",
    imageUrl: "",
    description: "",
    done: false,
  };
  componentDidUpdate(prevProps, prevState) {
    checkExpire(this.props.logout).then(() => {
      if(!localStorage.hasOwnProperty('adminData')){
      this.props.history.push('/login');
      }
    });
  }
  componentDidMount() {
    checkExpire(this.props.logout).then(() => {
      if(!localStorage.hasOwnProperty('adminData')){
      this.props.history.push('/login');
      }
    });
    const movieId = this.props.match.params.movieId;
    const storedData = JSON.parse(localStorage.getItem("adminData"));
    this.props.fetchMovieById(movieId).then(() => {
      this.setState({
        name:this.props.movie.name,
        trailerUrl:this.props.movie.trailerUrl,
        genre:this.props.movie.genre,
        director:this.props.movie.director,
        country:this.props.movie.country,
        duration:this.props.movie.duration,
        imdb:this.props.movie.imdbPoint,
        publishedDate:this.props.movie.publishedDate,
        downloadUrl:this.props.movie.downloadUrl,
        imageUrl:this.props.movie.imageUrl,
        description:this.props.movie.description,

      })

      if(this.props.movie.creator !== storedData.adminId){
        this.props.history.push('/');
      }
    });
    
    window.scrollTo(0, 0);
  }
  render() {
    const editMovieSubmitHandler = (e) => {
    const movieId = this.props.match.params.movieId
    console.log();
      e.preventDefault();
      if (localStorage.hasOwnProperty("adminData"))
        this.props.editMovie(
          movieId,
          this.state.name,
          this.state.downloadUrl,
          this.state.imageUrl,
          this.state.trailerUrl,
          this.state.director,
          this.state.country,
          this.state.genre,
          this.state.imdb,
          this.state.duration,
          this.state.publishedDate,
          this.state.description
        ).then(result => this.setState({done:true}));
        
    };
    const handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
    return (
      <React.Fragment>
        {this.props.fetching || this.state.done ? (
          <HashLoader
            color={"#36bdb3"}
            size={40}
            loading={this.props.fetching}
          />
        ) : (
          <Form>
            <h2>Yeni Film Ekle</h2>
            <Form.Group widths="2">
              <Form.Input 
                value={this.state.name || ""}
                onChange={handleChange}
                name="name"
                fluid
                label="Film Adı"
                placeholder="Film Adı"
              />
              <Form.Input
              value={this.state.genre || ""}
                onChange={handleChange}
                name="genre"
                fluid
                label="Tür"
                placeholder="Tür"
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
              value={this.state.director || ""}
                onChange={handleChange}
                name="director"
                fluid
                label="Yönetmen"
                placeholder="Yönetmen"
              />
              <Form.Input
              value={this.state.country || ""}
                onChange={handleChange}
                name="country"
                fluid
                label="Ülke"
                placeholder="Ülke"
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
              value={this.state.duration || ""}
                onChange={handleChange}
                name="duration"
                fluid
                label="Film Uzunluğu"
                placeholder="Film Uzunluğu"
              />
              <Form.Input
              value={this.state.imdb || ""}
                onChange={handleChange}
                name="imdb"
                fluid
                label="Imdb Puanı"
                placeholder="Imdb Puanı"
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
              value={this.state.publishedDate || ""}
                fluid
                name="publishedDate"
                label="Yayınlanma Tarihi"
                placeholder="Yayınlanma Tarihi"
                onChange={handleChange}
              />
              <Form.Input
              value={this.state.downloadUrl || ""}
                onChange={handleChange}
                name="downloadUrl"
                fluid
                label="İndirme Linki"
                placeholder="İndirme Linki"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
              value={this.state.imageUrl || ""}
                name="imageUrl"
                onChange={handleChange}
                width="8"
                fluid
                label="Resim Linki"
                placeholder="Resim Linki"
              />
              <Form.Input
              value={this.state.trailerUrl || ""}
                name="trailerUrl"
                onChange={handleChange}
                width="8"
                fluid
                label="Fragman Linki"
                placeholder="Fragman Linki"
              />
            </Form.Group>
            <Form.Group widths="equal">
              {!this.state.imageUrl ? null : (
                <Image size="tiny" src={this.state.imageUrl} />
              )}
              <Form.TextArea
              value={this.state.description || ""}
                name="description"
                onChange={handleChange}
                label="Konu"
                placeholder="Film hakkında daha fazla bilgi..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Button type="submit" onClick={editMovieSubmitHandler}>
                Güncelle
              </Form.Button>
            </Form.Group>
          </Form>
        )}
        {this.state.done && <Redirect to="/" />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.data.fetching,
    movie: state.data.movie
  };
};

const mapDispatchToProps = {
  editMovie,
  fetchMovieById,
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMovie));
