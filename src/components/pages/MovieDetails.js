import React, { Component } from "react";
// import Player from 'react-player';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'
import { fetchMovieById } from "../../actions/movie-details-actions";
import {  Menu, Segment, Image, Button, Icon } from "semantic-ui-react";
import {HashLoader} from 'react-spinners';
import './MovieDetails.css';

import {logout} from '../../actions/authentication-actions';

import checkExpire from '../../util/checkTokenExpire';

class MovieDetails extends Component {
  state = { activeItem: 'Konu' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    checkExpire(this.props.logout);
    window.scrollTo(0, 0);
    const movieId = this.props.match.params.movieId;
    this.props.fetchMovieById(movieId);
  }

  componentDidUpdate(prevProps, prevState) {
    checkExpire(this.props.logout);
  }
  
  render() {
    const { activeItem } = this.state
    return (
      <React.Fragment>
        {this.props.fetching ? 
        <HashLoader color={"#36bdb3"} size={40} loading={this.props.fetching} /> :
          <div>
      <h1><i>{this.props.movie.name}</i></h1> 
      <h4>{this.props.movie.genre}</h4>

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
            name='Filmi İzle'
            style={{fontFamily:'Verdana'}}
            active={activeItem === 'Filmi İzle'}
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
        { }
        {this.state.activeItem==="Filmi İzle" &&
        // <iframe style={{float:'left'}} height="310px" url={this.props.movie.trailerUrl} controls={true}></iframe>
        <iframe title="trailer" src={this.props.movie.trailerUrl} controls={true} style={{float:'left', width:'50%'}} height="310px"></iframe>
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

        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.data.movie,
    fetching:state.data.fetching
  };
};

const mapDispatchToProps = {
  fetchMovieById,
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieDetails));
