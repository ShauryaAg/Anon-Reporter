export const AnonContractAddress = "0xc7D1674d4664E156b33a7a8bBD396b5bF15bc905"

export const AnonContractABI = [
	{
		constant: true,
		inputs: [],
		name: "nextStreamId",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [],
		name: "initialize",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [],
		name: "fee",
		outputs: [
			{
				internalType: "uint256",
				name: "mantissa",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "deposit",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "tokenAddress",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "startTime",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "stopTime",
				type: "uint256"
			}
		],
		name: "CreateStream",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "WithdrawFromStream",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "senderBalance",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "recipientBalance",
				type: "uint256"
			}
		],
		name: "CancelStream",
		type: "event"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			}
		],
		name: "getStream",
		outputs: [
			{
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deposit",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "tokenAddress",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "startTime",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "stopTime",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "remainingBalance",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "ratePerSecond",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			}
		],
		name: "deltaOf",
		outputs: [
			{
				internalType: "uint256",
				name: "delta",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			}
		],
		name: "deltaOfReverseStream",
		outputs: [
			{
				internalType: "uint256",
				name: "delta",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			}
		],
		name: "balanceOfReverseStream",
		outputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "who",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "deposit",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "tokenAddress",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "stopTime",
				type: "uint256"
			}
		],
		name: "createReverseStream",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deposit",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "tokenAddress",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "startTime",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "stopTime",
				type: "uint256"
			}
		],
		name: "createStream",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "withdrawFromStream",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			}
		],
		name: "cancelStream",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "streamId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "burnPart",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "refundPart",
				type: "uint256"
			}
		],
		name: "Close",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "string",
				name: "_content",
				type: "string"
			},
			{
				internalType: "uint256",
				name: "deposit",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "tokenAddress",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "stopTime",
				type: "uint256"
			}
		],
		name: "reportEvent",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "by",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "id",
				type: "uint256"
			},
		],
		name: "Reported",
		type: "event"
	},
	{
		constant: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
		],
		name: "getUserReports",
		outputs: [
			{
				name: "Reports",
				type: "tuple[]",
				components: [
					{
						internalType: "uint256",
						name: "Id",
						type: "uint256"
					},
					{
						internalType: "string",
						name: "content",
						type: "string"
					},
					{
						internalType: "uint256",
						name: "streamId",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256"
					},
					{
						internalType: "bool",
						name: "valid",
						type: "bool"
					}
				]
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [],
		name: "getAllReports",
		outputs: [
			{
				name: "Reports",
				type: "tuple[]",
				components: [
					{
						internalType: "uint256",
						name: "Id",
						type: "uint256"
					},
					{
						internalType: "string",
						name: "content",
						type: "string"
					},
					{
						internalType: "uint256",
						name: "streamId",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256"
					},
					{
						internalType: "bool",
						name: "valid",
						type: "bool"
					}
				]
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256"
			},
		],
		name: "toggleReportValidity",
		outputs: [
			{
				internalType: "bool",
				name: "valid",
				type: "bool",
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "id",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "bool",
				name: "valid",
				type: "bool"
			},
		],
		name: "ToggleValidity",
		type: "event"
	},
];