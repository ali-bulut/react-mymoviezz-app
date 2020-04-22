import React, { Component } from "react";
import { Form, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import { addMovie } from "../../actions/movies-actions";
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
    window.scrollTo(0, 0);
  }

  render() {
    const addMovieSubmitHandler = (e) => {
      e.preventDefault();
      if (localStorage.hasOwnProperty("adminData"))
        this.props.addMovie(
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
                onChange={handleChange}
                name="name"
                fluid
                label="Film Adı"
                placeholder="Film Adı"
              />
              <Form.Input
                onChange={handleChange}
                name="genre"
                fluid
                label="Tür"
                placeholder="Tür"
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                onChange={handleChange}
                name="director"
                fluid
                label="Yönetmen"
                placeholder="Yönetmen"
              />
              <Form.Input
                onChange={handleChange}
                name="country"
                fluid
                label="Ülke"
                placeholder="Ülke"
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                onChange={handleChange}
                name="duration"
                fluid
                label="Film Uzunluğu"
                placeholder="Film Uzunluğu"
              />
              <Form.Input
                onChange={handleChange}
                name="imdb"
                fluid
                label="Imdb Puanı"
                placeholder="Imdb Puanı"
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                fluid
                name="publishedDate"
                label="Yayınlanma Tarihi"
                placeholder="Yayınlanma Tarihi"
                onChange={handleChange}
              />
              <Form.Input
                onChange={handleChange}
                name="downloadUrl"
                fluid
                label="İndirme Linki"
                placeholder="İndirme Linki"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="imageUrl"
                onChange={handleChange}
                width="8"
                fluid
                label="Resim Linki"
                placeholder="Resim Linki"
              />
              <Form.Input
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
                name="description"
                onChange={handleChange}
                label="Konu"
                placeholder="Film hakkında daha fazla bilgi..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Button type="submit" onClick={addMovieSubmitHandler}>
                Oluştur
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
  addMovie,
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMovie));
