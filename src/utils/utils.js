import Web3 from "web3";
import { ethers } from "ethers";

import { AnonContractABI, AnonContractAddress } from "../contracts/configs/AnonContractConfig";
import { TokenABI } from "../contracts/configs/TokenContractConfig";

async function GetAnonContract(web3) {
	web3 = new Web3(web3.givenProvider);

	let contract = new web3.eth.Contract(AnonContractABI, AnonContractAddress, {
		transactionConfirmationBlocks: 1
	});

	return contract;
}

async function GetTokenContract(web3, tokenAddress) {
	web3 = new Web3(web3.givenProvider);

	let contract = new web3.eth.Contract(TokenABI, tokenAddress, {
		transactionConfirmationBlocks: 1
	});
	return contract;
}

export async function ApproveTokens(web3, account, amount, tokenAddress) {
	var userAddr = account;
	var tokenContract = await GetTokenContract(web3, tokenAddress);

	console.log(
		"balance of account",
		await tokenContract.methods.balanceOf(account).call()
	);

	try {
		await tokenContract.methods
			.approve(
				AnonContractAddress,
				ethers.utils.parseEther(amount).toString()
			)
			.send({ from: userAddr, gasPrice: 0 });
	} catch (e) {
		console.log("error while approving", e);
		throw e;
	}
	return;
}

// StartReverseStream tries to start the reverse stream
// 1. Approve the deposit amount
// 2. Start the reverse stream
// Metamask will open twice to do this
// Will always return streamID and error. Error can be null
export async function StartReverseStream(
	web3,
	deposit,
	stopTime,
	tokenAddress,
	userAddr
) {
	console.log(
		"deposit ",
		deposit,
		"stopTime ",
		stopTime,
		"tokenAddress ",
		tokenAddress,
		"userAddr ",
		userAddr,
	);
	// get anon contract instance
	var AnonContract = await GetAnonContract(web3);

	try {
		const streamId = await AnonContract.methods
			.createReverseStream(
				ethers.utils.parseEther(deposit).toString(),
				tokenAddress,
				stopTime
			)
			.send({ from: userAddr, gasPrice: 20 });
		var nextStreamID = await AnonContract.methods.nextStreamId().call();
		console.log("next streamID fetches", nextStreamID);
		console.log("Tx was a success");
		return nextStreamID - 1;
	} catch (e) {
		console.log("error while createing reverse stream", e);
		throw e;
	}
}

// Closes stream on the anon contract
// Will always return an error or null -> so make sure you check that
export async function CloseStream(
	web3,
	streamID,
	burnPart,
	refundPart,
	userAddr
) {
	var AnonContract = await GetAnonContract(web3);
	try {
		// create reverse stream
		await AnonContract.methods
			.Close(streamID)
			.send({ from: userAddr, gasPrice: 0 });
		return null;
	} catch (e) {
		console.log("error while closing stream", e);
		throw e;
	}
}

// Dont use this one
export async function toggleValidity(
	web3,
	streamID,
	userAddr
) {
	var AnonContract = await GetAnonContract(web3);
	try {
		const valid = await AnonContract.methods
			.toggleReportValidity(streamID)
			.send({ from: userAddr, gasPrice: 0 })
		return valid;
	} catch (e) {
		console.log("error while toggling validity", e)
	}
}

export async function BalanceOfStream(web3, streamID) {
	var AnonContract = await GetAnonContract(web3);
	try {
		// create reverse stream
		var balance = await AnonContract.methods
			.balanceOfReverseStream(streamID)
			.call();
		balance = Number((balance / 10 ** 18).toFixed(3));

		return balance;
	} catch (e) {
		console.log("error while getting user balance stream", e);
		throw e;
	}
}

export async function CreateReport(
	web3,
	content,
	deposit,
	stopTime,
	tokenAddress,
	userAddr
) {
	var AnonContract = await GetAnonContract(web3)

	console.log(
		"deposit ",
		deposit,
		"stopTime ",
		stopTime,
		"tokenAddress ",
		tokenAddress,
		"userAddr ",
		userAddr,
		"content",
		content
	);

	try {
		await AnonContract.methods
			.reportEvent(
				content,
				ethers.utils.parseEther(deposit).toString(),
				tokenAddress,
				stopTime
			)
			.send({ from: userAddr, gasPrice: 20 })

		var nextStreamID = await AnonContract.methods.nextStreamId().call();
		console.log("next streamID fetches", nextStreamID);
		console.log("Tx was a success");
	} catch (e) {
		console.log("error while creating report", e)
	}
}