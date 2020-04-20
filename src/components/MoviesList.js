import React from 'react';
import { Grid } from "semantic-ui-react";

import MovieCard from "./MovieCard";

const MoviesList = (props) => {
    return (
        <div>
            <Grid columns={3}>
            {props.movies.map(movie => 
                <Grid.Column key={movie.id}>
                <MovieCard isAdmin={props.isAdmin} movie={movie} />
              </Grid.Column>
                )}
              
            </Grid>
        </div>
    );
};

export default MoviesList;