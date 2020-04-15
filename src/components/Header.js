import React from "react";
import {Link} from 'react-router-dom';
import logo from "../logo.svg";

import { Container, Dropdown, Image, Menu, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const HeaderContent = () => {
  return (
    <React.Fragment>
      <Menu fixed="top" inverted>
        <Container>
            <Link to="/">
          <Menu.Item header>
            <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
            MyMoviezz
          </Menu.Item>
          </Link>
          <Menu.Item as="a" position="right">
            <Icon name="adn" />
            Adminlerimiz
          </Menu.Item>
          <Menu.Item as="a" >
            <Icon name="sign-in" />
            Giriş Yap / Üye Ol
          </Menu.Item>
          <Menu.Item as="a" >
            <Icon name="add circle" />
            Yeni Film Ekle
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="ethereum" />
            Eklediğim Filmler
          </Menu.Item>

          <Dropdown 
            icon="user circle outline"
            item
            simple
            text="Admin Name &nbsp;"
          >
            <Dropdown.Menu >
            <Dropdown.Item>
                <Icon name="log out" />
                Çıkış Yap
              </Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item>
                <Icon name="user" />
                Hesabı Güncelle
              </Dropdown.Item>
              <Dropdown.Item>
                <Icon name="remove user" />
                Hesabı Sil
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    </React.Fragment>
  );
};

export default HeaderContent;
