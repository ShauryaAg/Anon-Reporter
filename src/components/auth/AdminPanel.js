import React from 'react';
import Web3 from 'web3';

import Login from "./Login";
import firebase from "../../firebase";
import { Button, Divider, Header, Grid, Icon, Menu, Item, Segment } from "semantic-ui-react";
import Swal from 'sweetalert2';

import * as utils from '../../utils/utils'
import { AnonContractABI, AnonContractAddress } from '../../contracts/configs/AnonContractConfig'

class AdminPanel extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      reports: [],
      balances: [],
    }

  }

  componentWillMount() {
    this.loadBlockchainData()
  }

  handleToggleDropdownMenu = () => {
    let newState = Object.assign({}, this.state);
    if (newState.dropdownMenuStyle.display === "none") {
      newState.dropdownMenuStyle = { display: "flex" };
    } else {
      newState.dropdownMenuStyle = { display: "none" };
    }

    this.setState(newState);
  };

  async loadBlockchainData() {
    try {
			await window.ethereum.enable();
		} catch (e) {
			Swal.fire("Couldn't enable Ethereum, do you have metamask installed?")
		}

		const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545")

    this.setState({ web3 })

    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })

    const reportContract = new web3.eth.Contract(AnonContractABI, AnonContractAddress)
    console.log(reportContract)
    this.setState({ reportContract })

    const reports = await reportContract.methods.getAllReports().call()
    console.log("user reports", reports)
    this.setState({ reports });

    let balances = [];

    reports.forEach(async report => {
      balances.push(await this.getBalance(report.Id));
    })

    this.setState({ balances });

    console.log("state:", this.state);
  }

  async burnAmount(id) {
    const { web3, account } = this.state;

    try {
      await utils.CloseStream(web3, id, 0, 0, account);
      Swal.fire({
        icon: 'success',
        text: 'Burnt Successfully!'
      })
    } catch(err) {
      Swal.fire({
        icon: 'error',
        text: 'Cannot burn!'
      })
    }

  }

  async getBalance(streamId) {
    const { web3, reports } = this.state;
    let balance;
    try {
      balance = await utils.BalanceOfStream(web3, streamId);
      balance = Number(reports[streamId].amount / 10 ** 18 - balance).toFixed(3);
    } catch(err) {
      balance = 'Stream has been closed'
    }
    return balance;
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
        // <div>
        //   <button onClick={this.handleSignOut}>Logout</button>
        //   {
        //     this.state.reports.map(element => {
        //       return( <div>
        //         <div> {element.Id}</div>
        //         <div> {element.content}</div>
        //         <div> {element.amount}</div>
        //       </div> )
        //     })
        //   }
        // </div> :
        <div>
          <Grid padded>
            <Menu size="large" inverted borderless fluid fixed="top">
              <Menu.Item header as="a">
                Admin Panel
              </Menu.Item>
              <Menu.Menu position="right">
                <Menu.Item as="a" onClick={this.handleSignOut}>Logout</Menu.Item>
              </Menu.Menu>
            </Menu>
          </Grid>
          <Header as='h1' textAlign='center' style={{ marginTop: '50px' }}>Reports</Header>
          <Segment style={{ marginTop: '30px' }}>
            <Item.Group divided>
              {this.state.reports.map(report => {
                return (
                  <Item>
                    <Item.Content>
                    <Button
                      style={{margin: "10px 0px", float: 'right', padding: '1.5rem'}}
                      onClick={() => this.burnAmount(report.Id)}
                      disabled={!report.valid}
                      size="tiny"
                      color='red'
                    >
                      Burn Amount
                    </Button>
                      <Item.Header>Id: {report.Id}</Item.Header>
                      <Item.Meta>Content: {report.content}</Item.Meta>
                      <Item.Extra>Amount: {Number(report.amount / 10 ** 18)} Tokens</Item.Extra>
                      <Item.Extra>Tokens left: {this.state.balances[report.Id]}</Item.Extra>
                    </Item.Content>
                  </Item>
                  );
              })}
            </Item.Group>
          </Segment>
        </div> :
        <Login />
    );
  }
}

export default AdminPanel;