import React, { Component } from "react";
import { Form, Image } from "semantic-ui-react";
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import {updateAdmin, fetchAdminById} from '../../actions/admins-actions';
import { HashLoader } from "react-spinners";
import { Redirect } from "react-router-dom";

import {logout} from '../../actions/authentication-actions';

import checkExpire from '../../util/checkTokenExpire';

class AddMovie extends Component {
  state = {
    fullname: "",
    email: "",
    password: "",
    image:"",
    done: false,
  };
  componentDidUpdate(prevProps, prevState) {
    checkExpire(this.props.logout).then(() => {
      if(!localStorage.hasOwnProperty('adminData')){
      this.props.history.push('/login');
      }
    });
  }
  componentDidMount() {
    checkExpire(this.props.logout).then(() => {
      if(!localStorage.hasOwnProperty('adminData')){
      this.props.history.push('/login');
      }
    });
    const storedData = JSON.parse(localStorage.getItem("adminData"));
    const adminId = storedData.adminId;
    this.props.fetchAdminById(adminId).then(() => {
      this.setState({
        fullname:this.props.admin.fullname,
        email:this.props.admin.email,
        password:this.props.admin.password,
        image:this.props.admin.image,
      })

      if(this.props.admin.id !== storedData.adminId){
        this.props.history.push('/');
      }
    });
    
    window.scrollTo(0, 0);
  }
  render() {
    const updateAdminSubmitHandler = (e) => {
    let storedData = JSON.parse(localStorage.getItem("adminData"));
    const token = storedData.token;
      e.preventDefault();
      if (localStorage.hasOwnProperty("adminData"))
        this.props.updateAdmin(
          this.state.fullname,
          this.state.email,
          this.state.password,
          this.state.image
        ).then(result => {
          const newData = {
            adminId: this.props.admin.id,
            email: this.state.email,
            fullname: this.state.fullname,
            token: token
          }
          localStorage.setItem('adminData', JSON.stringify(newData));
          this.setState({done:true})
        });
        
    };
    const handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
    return (
      <React.Fragment>
        {this.props.fetching || this.state.done ? (
          <HashLoader
            color={"#36bdb3"}
            size={40}
            loading={this.props.fetching}
          />
        ) : (
          <Form>
            <h2>Hesabı Güncelle</h2>
            <Form.Group widths="2">
              <Form.Input 
                value={this.state.fullname || ""}
                onChange={handleChange}
                name="fullname"
                fluid
                label="Ad-Soyad"
                placeholder="Ad-Soyad"
              />
              
            </Form.Group>
            <Form.Group widths="2">
            <Form.Input
              value={this.state.email || ""}
                onChange={handleChange}
                name="email"
                fluid
                label="Email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group widths="2">
            <Form.Input
              type="password"
              value={this.state.password || ""}
                onChange={handleChange}
                name="password"
                fluid
                label="Parola"
                placeholder="Parola"
              />
            </Form.Group>
            <Form.Group widths="2">
            <Form.Input
                value={this.state.image || ""}
                onChange={handleChange}
                name="image"
                fluid
                label="Profil Resmi"
                placeholder="Profil Resmi"
              />
            </Form.Group>
            <Form.Group widths="equal">
              {!this.state.image ? null : (
                <Image size="tiny" src={this.state.image} />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Button type="submit" onClick={updateAdminSubmitHandler}>
                Güncelle
              </Form.Button>
            </Form.Group>
          </Form>
        )}
        {this.state.done && <Redirect to="/" />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.admins.fetching,
    admin: state.admins.admin
  };
};

const mapDispatchToProps = {
  updateAdmin,
  fetchAdminById,
  logout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMovie));
