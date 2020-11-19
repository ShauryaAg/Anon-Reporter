import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import firebase from "../../firebase";

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  inputErrorHandler = (inputName) => {
    return this.state.error.toLowerCase().includes(inputName) ? 'error' : '';
  };

  isFormValid = () => (this.state.email && this.state.password);

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.isFormValid()) {
      this.setState({ error: '', loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          console.log("User logged in!");
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: err.message, loading: false });
        })
    }
  }

  render() {

    const { email, password, error, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Admin Panel
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>

              <Form.Input
                fluid
                name="email"
                icon="mail"
                className={this.inputErrorHandler('email')}
                value={email}
                iconPosition="left"
                placeholder="Email"
                onChange={this.handleChange}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                className={this.inputErrorHandler('password')}
                value={password}
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                type="password"
              />
              <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          {error.length > 0 &&
            <Message error>{error}</Message>
          }
          </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
