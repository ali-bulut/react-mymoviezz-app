import React from "react";
import { Card, Icon, Button } from "semantic-ui-react";

const MovieCard = (props) => {
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
          {props.movie.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Button>
          <Icon name="download" />
          <a
            href={props.movie.downloadUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Filmi Indir
          </a>
        </Button>
        <Button style={{float:'right'}}>
          <Icon name="hand point right" />
          &nbsp; Detaylar
        </Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default MovieCard;
