import React from "react";
import {Route} from 'react-router-dom';

import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import HeaderContent from "./components/Header";
import FooterContent from "./components/Footer";
import HomePage from "./components/pages/HomePage";


function App() {

  return (
    <div>
      <HeaderContent />

          <Container style={{ marginTop: "7em" }}>
            <Route path="/" exact component={HomePage}></Route>
          </Container>
  
      <FooterContent />
    </div>
  );
}



export default App;
