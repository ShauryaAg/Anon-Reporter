import Web3 from 'web3';
import React from 'react';
import {
	Grid,
	Form,
	Segment,
	Header,
	Icon,
	Button,
	TextArea
} from 'semantic-ui-react';

import * as utils from '../../utils/utils'
import { AnonContractABI, AnonContractAddress } from '../../contracts/configs/AnonContractConfig';
import { TokenABI, TokenAddress } from '../../contracts/configs/TokenContractConfig';

class ReportForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			detail: '',
			account: '',
			amount: '1',
			tokenAddress: TokenAddress
		}

		this.approveToken = this.approveToken.bind(this)
		this.handleChange = this.handleChange.bind(this)
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
		this.setState({ reportContract: reportContract })

		console.log(this.state)
	}

	async approveToken() {
		const web3 = new Web3(Web3.currentProvider || "http://127.0.0.1:8545")
		const { account, amount, tokenAddress } = this.state

		try {
			await utils.ApproveTokens(
				web3,
				account,
				amount,
				tokenAddress
			);
		} catch (e) {
			console.error("cannot approve token", e)
		}
	}


	async createReport(content) {
		const web3 = new Web3(Web3.currentProvider || "http://127.0.0.1:8545")
		const { account, amount, tokenAddress } = this.state


		const getUnixTimeUtc = (dateString = new Date()) =>
			Math.round(new Date(dateString).getTime() / 1000);
		var stopTime = getUnixTimeUtc() + 3600;

		try {
			// await utils.CreateReport(web3, content, account)
			var streamID = await utils.StartReverseStream(
				web3,
				content,
				amount,
				stopTime,
				tokenAddress,
				account
			)
			console.log("streamID", streamID)
		} catch (e) {
			console.log("cannot create report", e)
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.detail);
		this.createReport(this.state.detail)
	}

	render() {
		return (
			<Grid textAlign="center" verticalAlign="middle" className="app">
				<Grid.Column style={{ maxWidth: 550 }}>
					<Header as="h1" icon color="violet" textAlign="center">
						<Icon name="edit outline" color="violet" />
			Report
		  </Header>
					<Form onSubmit={this.approveToken} size="large">
						<Segment stacked>
							<TextArea
								placeholder='Amount'
								name='amount'
								onChange={this.handleChange}
							/>
							<TextArea
								placeholder='Token Address!'
								name='tokenAddress'
								value={this.state.tokenAddress}
								onChange={(e) => { this.handleChange(e) }}
							/>
							<Button color="violet" fluid size="large" style={{ marginTop: "10px" }}>
								Approve Token
			  </Button>
						</Segment>
					</Form>
					<Form onSubmit={this.handleSubmit} size="large">
						<Segment stacked>
							<TextArea
								placeholder='Tell us!'
								name='detail'
								onChange={this.handleChange}
							/>
							<Button color="violet" fluid size="large" style={{ marginTop: "10px" }}>
								Proceed
			  </Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

export default ReportForm;