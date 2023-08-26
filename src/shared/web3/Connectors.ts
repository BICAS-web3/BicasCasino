import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
    walletlink: {
        package: CoinbaseWalletSDK,
        options: {
            appName: "Web 3 Modal Demo", // Required
            rpc: {
                137: "https://matic-mainnet.chainstacklabs.com"
            }
        }
    },
    walletconnect: {
        package: WalletConnect,
        options: {
            rpc: {
                137: "https://matic-mainnet.chainstacklabs.com"
            }
        }
    }
};