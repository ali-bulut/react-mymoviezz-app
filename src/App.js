import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import HeaderContent from "./components/Header";
import FooterContent from "./components/Footer";
import HomePage from "./components/pages/HomePage";
import MovieDetails from "./components/pages/MovieDetails";
import AdminList from "./components/pages/AdminList";
import LoginPage from "./components/pages/LoginPage";
import { connect } from "react-redux";
import AddMovie from "./components/pages/AddMovie";


class App extends React.Component {
  render(){
  let routes;
    //  const storedData = JSON.parse(localStorage.getItem("adminData"));
  if(!localStorage.hasOwnProperty('adminData')){
    routes=(
      <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/admins" exact component={AdminList}></Route>
            <Route path="/login" exact component={LoginPage}></Route>
            <Route path="/movie/:movieId" exact component={MovieDetails}></Route>
            <Redirect to="/"/>
      </Switch>
    );
  }
  else{
    routes=(
    <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/admins" exact component={AdminList}></Route>
            <Route path="/addmovie" exact component={AddMovie}></Route>
            <Route path="/movie/:movieId" exact component={MovieDetails}></Route>
            <Redirect to="/"/>
      </Switch>
    )
  }


  return (
    <div>
      <HeaderContent />
          <Container style={{ marginTop: "7em" }}>
            {routes}
            {/* <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/admins" exact component={AdminList}></Route>
            <Route path="/login" exact component={LoginPage}></Route>
            <Route path="/movie/add" exact component={AddMovie}></Route>
            <Route path="/movie/:movieId" exact component={MovieDetails}></Route>
            <Redirect to="/"/>
          </Switch> */}
          </Container>
  
      <FooterContent />
    </div>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    localStorage: state.authentication.localStorage
  };
};

export default connect(mapStateToProps)(App);
