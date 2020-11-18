import React from 'react';
import Login from "./Login";
import firebase from "../../firebase";

class AdminPanel extends React.Component {

  state = {
    user: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    })
  }

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.setState({user: null}));
  }

  render() {
    return (
      this.state.user ? 
        <div>
          <button onClick={this.handleSignOut}>Logout</button>
        </div> : 
        <Login />
    );
  }
}

export default AdminPanel;