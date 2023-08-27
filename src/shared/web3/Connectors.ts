import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
    walletlink: {
        package: CoinbaseWalletSDK,
        options: {
            appName: "BicasCasino", // Required
            rpc: {
                137: "https://matic-mainnet.chainstacklabs.com"
            }
        }
    },
    walletconnect: {
        package: WalletConnect,
        options: {
            projectId: '01e7a60839e8572c2da88e40b1db4893',
            appName: "BicasCasino",
            name: "BicasCasino",
            description: "My Dapp description",
            url: "https://app.bicas.io",
            rpc: {
                137: "https://matic-mainnet.chainstacklabs.com"
            }
        }
    }
};