import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContext from "./context/AuthContext";
import Web3Context from "./context/Web3Context";
import AlertContext from './context/AlertContext';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { GoogleOAuthProvider } from '@react-oauth/google';

const chains = [arbitrum, mainnet, polygon]
const projectId = 'eb39636079bdcec711680eb77389a480'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

ReactDOM.render(
    <GoogleOAuthProvider clientId="386703781468-3b5c69i2l43d1f7aqkbjp3ohb0f0mbe3.apps.googleusercontent.com">
    <AuthContext>
        <AlertContext>
            <Web3Context>
                <WagmiConfig config={wagmiConfig}>
                    <App />
                </WagmiConfig>
                <Web3Modal projectId={projectId} ethereumClient={ethereumClient} themeVariables={{ '--w3m-z-index': '10001' }} />
            </Web3Context>
        </AlertContext>
    </AuthContext >
    </GoogleOAuthProvider>,
    document.getElementById('root'));

