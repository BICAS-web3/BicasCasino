export const ABI = [
  {
    inputs: [
      { internalType: "address", name: "_bankroll", type: "address" },
      { internalType: "address", name: "_vrf", type: "address" },
      { internalType: "address", name: "link_eth_feed", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "uint256", name: "requestID", type: "uint256" }],
    name: "AwaitingVRF",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "have", type: "uint256" },
      { internalType: "uint256", name: "want", type: "uint256" },
    ],
    name: "BlockNumberTooLow",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "maxNumBets", type: "uint256" }],
    name: "InvalidNumBets",
    type: "error",
  },
  { inputs: [], name: "InvalidNumSectors", type: "error" },
  { inputs: [], name: "InvalidRisk", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "required", type: "uint256" },
      { internalType: "uint256", name: "sent", type: "uint256" },
    ],
    name: "InvalidValue",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "multipliers", type: "uint256" },
      { internalType: "uint256", name: "outcome", type: "uint256" },
    ],
    name: "MismatchedLength",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint8", name: "numSectors", type: "uint8" },
      { internalType: "uint8", name: "risk", type: "uint8" },
    ],
    name: "MultiplierAlreadySet",
    type: "error",
  },
  { inputs: [], name: "NotApprovedBankroll", type: "error" },
  { inputs: [], name: "NotAwaitingVRF", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "want", type: "address" },
      { internalType: "address", name: "have", type: "address" },
    ],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "have", type: "address" },
      { internalType: "address", name: "want", type: "address" },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "suspensionTime", type: "uint256" },
    ],
    name: "PlayerSuspended",
    type: "error",
  },
  { inputs: [], name: "RefundFailed", type: "error" },
  { inputs: [], name: "TransferFailed", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "wager", type: "uint256" },
      { internalType: "uint256", name: "maxWager", type: "uint256" },
    ],
    name: "WagerAboveLimit",
    type: "error",
  },
  { inputs: [], name: "ZeroWager", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wager",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payout",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "numSectors",
        type: "uint8",
      },
      { indexed: false, internalType: "uint8", name: "risk", type: "uint8" },
      {
        indexed: false,
        internalType: "uint8[]",
        name: "outcomes",
        type: "uint8[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "payouts",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "numGames",
        type: "uint32",
      },
    ],
    name: "Wheel_Outcome_Event",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wager",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "Wheel_Refund_Event",
    type: "event",
  },
  {
    inputs: [],
    name: "Bankroll",
    outputs: [
      { internalType: "contract IBankRoll", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ChainLinkVRF",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "IChainLinkVRF",
    outputs: [
      { internalType: "contract IVRFCoordinatorV2", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LINK_ETH_FEED",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VRFFees",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint8", name: "numSectors", type: "uint8" },
      { internalType: "uint8", name: "risk", type: "uint8" },
    ],
    name: "Wheel_GetMultipliers",
    outputs: [
      { internalType: "uint16[50]", name: "multipliers", type: "uint16[50]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "player", type: "address" }],
    name: "Wheel_GetState",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "wager", type: "uint256" },
          { internalType: "uint256", name: "stopGain", type: "uint256" },
          { internalType: "uint256", name: "stopLoss", type: "uint256" },
          { internalType: "uint256", name: "requestID", type: "uint256" },
          { internalType: "address", name: "tokenAddress", type: "address" },
          { internalType: "uint64", name: "blockNumber", type: "uint64" },
          { internalType: "uint32", name: "numBets", type: "uint32" },
          { internalType: "uint8", name: "risk", type: "uint8" },
          { internalType: "uint8", name: "numSectors", type: "uint8" },
        ],
        internalType: "struct Wheel.WheelGame",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "wager", type: "uint256" },
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "uint8", name: "numBets", type: "uint8" },
      { internalType: "uint8", name: "risk", type: "uint8" },
      { internalType: "uint8", name: "numSectors", type: "uint8" },
      { internalType: "uint256", name: "stopGain", type: "uint256" },
      { internalType: "uint256", name: "stopLoss", type: "uint256" },
    ],
    name: "Wheel_Play",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "Wheel_Refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "gasAmount", type: "uint256" }],
    name: "getVRFFee",
    outputs: [{ internalType: "uint256", name: "fee", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "requestId", type: "uint256" },
      { internalType: "uint256[]", name: "randomWords", type: "uint256[]" },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16[]", name: "multipliers", type: "uint16[]" },
      { internalType: "uint8", name: "numSectors", type: "uint8" },
      { internalType: "uint8", name: "risk", type: "uint8" },
    ],
    name: "setWheelMultipliers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "transferFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
