import React from 'react';
import logo from '../logo.svg';

import {
    Container,
    Divider,
    Grid,
    Header,
    Image,
    List,
    Segment
  } from 'semantic-ui-react';
  import 'semantic-ui-css/semantic.min.css';

const FooterContent = () => {
    return (
        <div>
            <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          
          <Grid.Column >
            <Header inverted as='h4' content='MyMoviezz Web Uygulaması' />
            <p>
              Designed by Ali Bulut <br/> 	&copy; 2020
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size='mini' src={logo} />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' target="_blank" href='mailto:alibulut@yahoo.com'>
            Mail
          </List.Item>
          <List.Item as='a' target="_blank" href='https://www.linkedin.com/in/bulutali/'>
            LinkedIn
          </List.Item>
          <List.Item as='a' target="_blank" href='https://www.github.com/ali-bulut/'>
            Diğer Projelerim
          </List.Item>
          {/* <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item> */}
        </List>
      </Container>
    </Segment>
        </div>
    );
};

export default FooterContent;