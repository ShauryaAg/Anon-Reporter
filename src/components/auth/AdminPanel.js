import React from 'react';
import Web3 from 'web3';

import Login from "./Login";
import firebase from "../../firebase";

import * as utils from '../../utils/utils'
import { AnonContractABI, AnonContractAddress } from '../../contracts/configs/AnonContractConfig'

class AdminPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      reports: []
    }

  }

  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.currentProvider || "http://127.0.0.1:8545")
    window.ethereum.enable();

    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })

    const reportContract = new web3.eth.Contract(AnonContractABI, AnonContractAddress)
    console.log(reportContract)
    this.setState({ reportContract })

    const reports = await reportContract.methods.getAllReports().call()
    console.log("user reports", reports)
    this.setState({ reports });
    console.log("state:", this.state);
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
      .then(() => this.setState({ user: null }));
  }

  render() {
    return (
      this.state.user ?
        <div>
          <button onClick={this.handleSignOut}>Logout</button>
          {
            this.state.reports.map(element => {
              return( <div>
                <div> {element.Id}</div>
                <div> {element.content}</div>
                <div> {element.amount}</div>
              </div> )
            })
          }
        </div> :
        <Login />
    );
  }
}

export default AdminPanel;