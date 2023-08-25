

// const options = {
//     dappMetadata: { name: "Bicas Casino", url: "https://mydapp.com" },
//     injectProvider: true
// };
// export const MMSDK = new MetaMaskSDK(options);

import { createEvent, createStore, sample } from 'effector';
import { ethers } from 'ethers';

type T_Web3Provider = {
    provider: ethers.providers.Web3Provider;
};

export const web3ProviderInitEv = createEvent<ethers.providers.Web3Provider>();

export const web3Provider = createStore<ethers.providers.Web3Provider | null>(null);

web3Provider.on(web3ProviderInitEv, (_, provider) => provider);