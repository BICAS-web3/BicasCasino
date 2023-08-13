import { MetaMaskSDK } from '@metamask/sdk';

const options = {
    dappMetadata: { name: "Bicas Casino", url: "https://mydapp.com" },
    injectProvider: true
};
export const MMSDK = new MetaMaskSDK(options);