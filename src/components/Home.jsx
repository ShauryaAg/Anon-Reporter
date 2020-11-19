import ethers from "ethers";
import React, {Component} from "react";
import Web3 from 'web3'

import {AnonContractAddress, AnonContractABI} from '../contracts/configs/AnonContractConfig'
import {TokenABI, TokenAddress} from '../contracts/configs/TokenContractConfig'
import * as utils from '../utils/utils'

class Home extends Component {
    componentWillMount() {
      this.loadBlockchainData()
    }
  
    async loadBlockchainData() {
      const web3 = new Web3(Web3.currentProvider || "http://127.0.0.1:8545")
      window.ethereum.enable();
      
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)
      this.setState({ account: accounts[0] })

      var balance = await web3.eth.getBalance(this.state.account)
      balance = web3.utils.toWei(balance)
      this.setState({ balance })
      console.log(balance)

      const reportContract = new web3.eth.Contract(AnonContractABI, AnonContractAddress)
      console.log(reportContract)
      this.setState({ reportContract })

      const reports = await reportContract.methods.getUserReports(this.state.account).call()
      console.log("user reports", reports)

      const allReports = await reportContract.methods.getAllReports().call()
      console.log("all reports", allReports)
    }
  
    constructor(props) {
      super(props)
      this.state = { 
        account: '',
        amount: '1',
      }

      this.onSubmit = this.onSubmit.bind(this)
    }

    async createReport(content){
      const web3 = new Web3(Web3.currentProvider || "http://127.0.0.1:8545")
      const reportContract = this.state.reportContract

      const gas = await reportContract.methods.reportEvent(content).estimateGas({from: this.state.account});
      console.log("gas ", gas)
      
      try {
        await reportContract.methods.reportEvent(content).send({from: this.state.account, gas: gas})
      } catch (e) {
        console.error("Reporting err", e)
      }
    }

    async approveToken(){
      const web3 = new Web3(Web3.currentProvider || "http://127.0.0.1:8545")

      try {
        await utils.ApproveTokens(
          web3,
          this.state.account,
          this.state.amount,
          TokenAddress
        );
      } catch (e) {
        console.error("cannot approve token", e)
      }
    }

    async onSubmit(e){
      e.preventDefault()
      const web3 = new Web3(Web3.currentProvider || "http://127.0.0.1:8545")
      const reportContract = this.state.reportContract

      await this.approveToken()

      const getUnixTimeUtc = (dateString = new Date()) =>
        Math.round(new Date(dateString).getTime() / 1000);
      var stopTime = getUnixTimeUtc() + 3600;

      try {
        await this.createReport("felula")
        
        var streamID = await utils.StartReverseStream(
          web3,
          this.state.amount,
          stopTime,
          TokenAddress,
          this.state.account
        );
        console.log("streamID", streamID)
      } catch(error) {
        console.error(error);
      }

      const reports = await reportContract.methods.getUserReports(this.state.account).call()
      console.log("reports", reports)
    }
  
    render() {
      return (
        <div className="container">
          <h1>Anon Reporter</h1>
          <p>Your account: {this.state.account}</p>
          <p>Your balance: {this.state.balance}</p>
        
          <div>
            <h2>Report</h2>
            <form action="" onSubmit={this.onSubmit}>
              <input type="text" name="content" id="report__description"/>
              <input type="submit" name="report__submit" id="report__submit"/>
            </form>
          </div>
        </div>
        
      );
    }
}

export default Home