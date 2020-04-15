import React, { Component } from "react";
import Player from 'react-player';
import { connect } from "react-redux";
import { fetchMovieById } from "../../actions/movie-details-actions";
import {  Menu, Segment, Image, Button, Icon } from "semantic-ui-react";
import './MovieDetails.css';

class MovieDetails extends Component {
  state = { activeItem: 'Konu' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    window.scrollTo(0, 0);
    const movieId = this.props.match.params.movieId;
    this.props.fetchMovieById(movieId);
  }
  
  render() {
    const { activeItem } = this.state
    return (
      <div>
    <h1><i>{this.props.movie.name}</i> <h4 >{this.props.movie.genre}</h4></h1>
        <Segment>
          <Image
            src={this.props.movie.imageUrl}
            size="medium"
            style={{height:'400px'}}
            rounded
            floated="left"
          />
          
          <Menu pointing>
          <Menu.Item
            name='Konu'
            style={{fontFamily:'Verdana'}}
            active={activeItem === 'Konu'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Detaylar'
            style={{fontFamily:'Verdana'}}
            active={activeItem === 'Detaylar'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Fragman'
            style={{fontFamily:'Verdana'}}
            active={activeItem === 'Fragman'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
          <Menu.Item>
          <a
            href={this.props.movie.downloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
        <Button>
          <Icon name="download" />
            Filmi Indir
        </Button>
        </a>
          </Menu.Item>
        </Menu.Menu>
        </Menu>
        {this.state.activeItem==="Konu" && <p style={{fontFamily:'Lucida Console'}}>{this.props.movie.description}</p>}
        {this.state.activeItem==="Fragman" && 
        <Player style={{float:'left'}} height="310px" url={this.props.movie.trailerUrl} controls={true}/>
        }
        {this.state.activeItem==="Detaylar" && 
        <div>
        <h3 style={{display:'inline-block'}}>Yönetmen: </h3>&nbsp;&nbsp;<h5 style={{display:'inline-block'}}>{this.props.movie.director}</h5> <br/>
        <h3 style={{display:'inline-block'}}>Ülke: </h3>&nbsp;&nbsp;<h5 style={{display:'inline-block'}}>{this.props.movie.country}</h5> <br/>
        <h3 style={{display:'inline-block'}}>IMDB Puanı: </h3>&nbsp;&nbsp;<h5 style={{display:'inline-block'}}>{this.props.movie.imdbPoint}</h5> <br/>
        <h3 style={{display:'inline-block'}}>Film Süresi: </h3>&nbsp;&nbsp;<h5 style={{display:'inline-block'}}>{this.props.movie.duration}</h5> <br/>
        <h3 style={{display:'inline-block'}}>Yayınlanma Tarihi: </h3>&nbsp;&nbsp;<h5 style={{display:'inline-block'}}>{this.props.movie.publishedDate}</h5>
        </div>
        }
          <div style={{ clear: "both" }}></div>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.data.movies,
    movie: state.data.movie,
  };
};

const mapDispatchToProps = {
  fetchMovieById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
