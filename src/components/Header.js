import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../logo.svg";

import { Container, Dropdown, Image, Menu, Icon, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";

import {login,logout, deleteAdmin} from '../actions/authentication-actions';


class HeaderContent extends React.Component {
  render() {
    const logout = () => {
        this.props.logout();
    }
    
    const deleteAccount = () => {
      this.props.deleteAdmin().then(() => {
        this.props.history.push('/login');
      });
    }
    
    let routes;
    if (localStorage.hasOwnProperty("adminData")) {
     const storedData = JSON.parse(localStorage.getItem("adminData"));
       routes = (
        <React.Fragment>
          <Menu.Item as={Link} to="/addmovie">
              <Icon name="add circle" />
              Yeni Film Ekle
            </Menu.Item>
            <Menu.Item as={Link} to="/mymovies">
              <Icon name="ethereum" />
              Eklediğim Filmler
            </Menu.Item>
            <Dropdown
              icon="user circle outline"
              item
              simple
              text={ storedData.fullname }
            >
              <Dropdown.Menu>
                <Dropdown.Item as={Button} onClick={logout}>
                  <Icon name="log out" />
                  Çıkış Yap 
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to={`/account/update/${storedData.adminId}`}>
                  <Icon name="user" />
                  Hesabı Güncelle
                </Dropdown.Item>
                <Dropdown.Item as={Button} onClick={deleteAccount}>
                  <Icon name="remove user" />
                  Hesabı Sil
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </React.Fragment>
      )
    }
    else{
        routes = (
          <React.Fragment>
          <Menu.Item as={Link} to="/login">
                <Icon name="sign-in" />
                Giriş Yap / Üye Ol
          </Menu.Item>
          </React.Fragment>
        )
    }
    return (
      <React.Fragment>
        <Menu fixed="top" inverted>
          <Container>
            <Link to="/">
              <Menu.Item header>
                <Image
                  size="mini"
                  src={logo}
                  style={{ marginRight: "1.5em" }}
                />
                MyMoviezz
              </Menu.Item>
            </Link>
            <Menu.Item as={Link} to="/admins" position="right">
              <Icon name="adn" />
              Adminlerimiz
            </Menu.Item>
            {routes}
          </Container>
        </Menu>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    fullname: state.authentication.fullname,
    localStorage: state.authentication.localStorage
  };
};

const mapDispatchToProps = {
  login,
  logout,
  deleteAdmin
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderContent));
