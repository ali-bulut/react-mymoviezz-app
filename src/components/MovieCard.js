import React from "react";
import {Link} from 'react-router-dom';
import { Card, Icon, Button } from "semantic-ui-react";

const MovieCard = (props) => {
    const description = props.movie.description;
    const shorterDesc = description.substring(0,130) + "...";
  return (
    <div>
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
        </Card.Content>
      </Card>
    </div>
  );
};

export default MovieCard;
