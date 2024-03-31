export const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_bankroll",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_vrf",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "link_eth_feed",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "AlreadyInGame",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "requestID",
                "type": "uint256"
            }
        ],
        "name": "AwaitingVRF",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "have",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "want",
                "type": "uint256"
            }
        ],
        "name": "BlockNumberTooLow",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "required",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "sent",
                "type": "uint256"
            }
        ],
        "name": "InvalidValue",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NoFeeRequired",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NoRequestPending",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotApprovedBankroll",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotInGame",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "want",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "have",
                "type": "address"
            }
        ],
        "name": "NotOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "have",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "want",
                "type": "address"
            }
        ],
        "name": "OnlyCoordinatorCanFulfill",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "suspensionTime",
                "type": "uint256"
            }
        ],
        "name": "PlayerSuspended",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RefundFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferFailed",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "wager",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "maxWager",
                "type": "uint256"
            }
        ],
        "name": "WagerAboveLimit",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ZeroWager",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "playerAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "wager",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "payout",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "number",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "suit",
                        "type": "uint8"
                    }
                ],
                "indexed": false,
                "internalType": "struct VideoPoker.Card[5]",
                "name": "playerHand",
                "type": "tuple[5]"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "outcome",
                "type": "uint256"
            }
        ],
        "name": "VideoPoker_Outcome_Event",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "wager",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            }
        ],
        "name": "VideoPoker_Refund_Event",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "playerAddress",
                "type": "address"
            },
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "number",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "suit",
                        "type": "uint8"
                    }
                ],
                "indexed": false,
                "internalType": "struct VideoPoker.Card[5]",
                "name": "playerHand",
                "type": "tuple[5]"
            }
        ],
        "name": "VideoPoker_Start_Event",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "Bankroll",
        "outputs": [
            {
                "internalType": "contract IBankRoll",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ChainLinkVRF",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "IChainLinkVRF",
        "outputs": [
            {
                "internalType": "contract IVRFCoordinatorV2",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "LINK_ETH_FEED",
        "outputs": [
            {
                "internalType": "contract AggregatorV3Interface",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "VRFFees",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            }
        ],
        "name": "VideoPoker_GetState",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "wager",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "requestID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "tokenAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint64",
                        "name": "blockNumber",
                        "type": "uint64"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint8",
                                "name": "number",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint8",
                                "name": "suit",
                                "type": "uint8"
                            }
                        ],
                        "internalType": "struct VideoPoker.Card[5]",
                        "name": "cardsInHand",
                        "type": "tuple[5]"
                    },
                    {
                        "internalType": "bool[5]",
                        "name": "toReplace",
                        "type": "bool[5]"
                    },
                    {
                        "internalType": "bool",
                        "name": "ingame",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isFirstRequest",
                        "type": "bool"
                    }
                ],
                "internalType": "struct VideoPoker.VideoPokerGame",
                "name": "videopokerState",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "VideoPoker_Refund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool[5]",
                "name": "toReplace",
                "type": "bool[5]"
            }
        ],
        "name": "VideoPoker_Replace",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "wager",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            }
        ],
        "name": "VideoPoker_Start",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "number",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "suit",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct VideoPoker.Card[5]",
                "name": "cardsInHand",
                "type": "tuple[5]"
            }
        ],
        "name": "_determineHandPayout",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "gasAmount",
                "type": "uint256"
            }
        ],
        "name": "getVRFFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "randomWords",
                "type": "uint256[]"
            }
        ],
        "name": "rawFulfillRandomWords",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "transferFees",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]