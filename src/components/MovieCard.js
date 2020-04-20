import React from "react";
import {Link, withRouter} from 'react-router-dom';
import { Card, Icon, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import {deleteMovie} from '../actions/movies-actions';
import {HashLoader} from 'react-spinners';

const MovieCard = (props) => {
    const description = props.movie.description;
    let shorterDesc;
    if(description){
      shorterDesc = description.substr(0,130) + "...";
    }
    const deleteMovie = (movieId) => {
      movieId = props.movie.id;
      props.deleteMovie(movieId).then(() => {
        props.history.push('/');
      });
    }
  return (
    <div>
      {props.fetching ? 
      <HashLoader color={"#36bdb3"} size={40} loading={this.props.fetching}/> :

      <Card>
        <img src={props.movie.imageUrl} height="350px;" alt={props.movie.name}/>
        <Card.Content>
          <Card.Header>{props.movie.name}</Card.Header>
          <Card.Meta>
            <span className="date">{props.movie.genre}</span>
          </Card.Meta>
          <Card.Description>
          {shorterDesc}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {!props.isAdmin ? 
          <div>
        <a
            href={props.movie.downloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
        <Button>
          <Icon name="download" />
            Filmi Indir
        </Button>
        </a>
        <Link to={`/movie/${props.movie.id}`}>
        <Button style={{float:'right'}}>
          <Icon name="hand point right" />
          &nbsp; Detaylar
        </Button>
        </Link>
        </div>
        // : null //todo -> add edit and delete buttons for admins
        :  
        <div>
          <Link to={`/editmovie/${props.movie.id}`}>
        <Button style={{float:'right'}}>
          <Icon name="hand point right" />
          &nbsp; Düzenle
        </Button>
        </Link>
        <Button onClick={deleteMovie}>
        <Icon name="delete" />
          Filmi Sil
        </Button>
      </div>
        }
        </Card.Content>
      </Card>
}
    </div>
      
  );
};

const mapStateToProps = state => {
  return{
    fetching:state.data.fetching,
    deletedMovie:state.data.deletedMovie
  }
}

const mapDispatchToProps ={
  deleteMovie
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MovieCard));
