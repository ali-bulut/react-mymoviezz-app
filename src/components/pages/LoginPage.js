import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/authentication-actions";
import { Redirect } from "react-router-dom";
import {HashLoader} from 'react-spinners';
import logo from "../../logo.svg";
import {
  Grid,
  Button,
  Header,
  Form,
  Segment,
  Message,
  Image,
} from "semantic-ui-react";


class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    formError: false,
    createUserError: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  

  render() {
    const loginSubmitHandler = (e) => {
      e.preventDefault();
      let error = false;
      // eslint-disable-next-line
      let checkIsEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.state.email === "" || !checkIsEmail.test(this.state.email) ) {
        this.setState({ emailError: true });
        error = true;
      } else {
        this.setState({ emailError: false });
        error = false;
      }

      if (this.state.password.length < 6) {
        this.setState({ passwordError: true });
        error = true;
      } else {
        this.setState({ passwordError: false });
        error = false;
      }
      if (error) {
        this.setState({ formError: true });
        return;
      }
      this.setState({ formError: false });
      this.props.login(this.state.email, this.state.password).then(() => {
        this.setState({ createUserError: false });
      }).catch(() => this.setState({ createUserError: true }));
    };

    const handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    return (
        <React.Fragment>
            {this.props.fetching ? 
        <HashLoader color={"#36bdb3"} size={40} loading={this.props.fetching} /> :
         <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >

        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={logo} /> Hesabına Giriş Yap
          </Header>
          <Form
            size="large"
            error={this.state.createUserError || this.state.formError}
          >
            {this.state.formError && (
              <Message
                error
                header="Lütfen bilgilerinizi kontrol edin!"
                content="Email yada şifreniz eksik! (Şifre minimum 6 karakterden oluşmalıdır.)" 
              />
            )}
            {this.state.createUserError ? (
              <Message
                error
                header="Lütfen bilgilerinizi kontrol edin!"
                content="Email yada şifreniz hatalı!"
              />
            ) : null}

            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail adresiniz"
                error={this.state.emailError}
                value={this.state.email}
                onChange={handleChange}
                name="email"
                id="email"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifreniz"
                type="password"
                error={this.state.passwordError}
                value={this.state.password}
                onChange={handleChange}
                name="password"
                id="password"
              />

              <Button
                type="submit"
                onClick={loginSubmitHandler}
                color="teal"
                fluid
                size="large"
                disabled={!this.state.email || !this.state.password}
              >
                Giriş Yap
              </Button>
            </Segment>
            {this.props.token && <Redirect to="/" />}
          </Form>
        </Grid.Column>
      </Grid>
  }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authentication.token,
    email: state.authentication.email,
    fullname: state.authentication.fullname,
    fetching: state.authentication.fetching
  };
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
