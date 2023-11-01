import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from "./AuthContext";
import axios from "axios";
// import NodeWalletConnect from "@walletconnect/node";
// import WalletConnectProvider from "@walletconnect/web3-provider";
export const Web3Context = createContext(null);

//  Create WalletConnect Provider
// const provider = new WalletConnectProvider({
//     infuraId: "ee2cbc278b5442dfbd27dedb4806c237",
//     rpc: {
//         137: "https://polygon-rpc.com",
//     },
//     chainId: 137
// });

var Web3 = require("web3");
var web3 = new Web3();


export default ({ children }) => {
    const [chainId, setChainId] = useState("137");
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        // const walletConnector = new NodeWalletConnect({ bridge: "https://bridge.walletconnect.org" }, { clientMeta: { description: "WalletConnect NodeJS Client", url: "https://nodejs.org/en/", icons: ["https://nodejs.org/static/images/logo.svg"], name: "WalletConnect", }, });
        // if (walletConnector.connected && localStorage.getItem("authMethod") === "walletConnect") {
        //     setChainId(walletConnector.chainId.toString());
        //     console.log(walletConnector.chainId.toString())
        //     setTimeout(() => {
        //         console.log(walletConnector)
        //     }, 2000);
        // }
        // walletConnector.on("session_update", (error, payload) => {
        //     if (error) { throw error; }
        //     const { accounts, chainId } = payload.params[0];
        //     // if accounts.length < 0 log user out!!!!!!!! ========================================
        //     setChainId(chainId.toString());
        // });
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', (_chainId) => setChainId(_chainId.toString()));
            window.ethereum.on('accountsChanged', function (accounts) {
                logout();
            });
            if (localStorage.getItem("authMethod") === "metamask") {
                if (window.ethereum.chainId) {
                    setChainId(window.ethereum.chainId.toString());
                }
            }
        }
    }, []);

    async function getAccountBalance(address) {
        var web3 = new Web3("https://polygon-rpc.com");
        const bal = await web3.eth.getBalance(address);
        return bal / 1000000000000000000;
    }

    async function sendTx(toAddress, fromAddress, amount, toID, fromID, videoID, type) {
        if (localStorage.getItem("authMethod") === "metamask") {
            const txData = await sendMeta(toAddress, fromAddress, amount, toID, fromID, videoID, type);
            return txData;
        } else if (localStorage.getItem("authMethod") === "walletConnect") {
            const txData = await sendWalletConnect(toAddress, fromAddress, amount, toID, fromID, videoID, type);
            return txData;
        }
    }

    async function sendMeta(toAddress, fromAddress, amount, toID, fromID, videoID, type) {
        let value = amount * 1000000000000000000;
        const transactionParameters = {
            nonce: '0x00',
            to: fromAddress,
            from: fromAddress,
            value: web3.utils.toHex(value.toString())
        };
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            let chainId = web3.utils.toHex(137);
            await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chainId }] });
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            try {
                // post tx to db
                const data = await axios.post('/tx/new-tx', {
                    video: videoID,
                    tx: {
                        to: toID,
                        from: fromID,
                        toAddress: toAddress,
                        fromAddress: fromAddress,
                        type: type,
                        amount: amount,
                        hash: txHash,
                        videoID: videoID,
                    }
                });
    
                return ({ txHash, error: false });
            } catch (error) {
                return ({ error: "db" });
            }
        } catch (err) {
            if (err === "incorrect address") {
                logout();
                return ({ error: err });
            }
            return ({ error: "meta" });
        }
    }

    async function sendWalletConnect(toAddress, fromAddress, amount, toID, fromID, videoID, type) {
        // Create connector
        // const walletConnector = await new NodeWalletConnect(
        //     {
        //         bridge: "https://bridge.walletconnect.org", // Required
        //     },
        //     {
        //         clientMeta: {
        //             description: "WalletConnect NodeJS Client",
        //             url: "https://nodejs.org/en/",
        //             icons: ["https://nodejs.org/static/images/logo.svg"],
        //             name: "WalletConnect",
        //         },
        //     }
        // );
        // if (walletConnector.accounts.length > 0) {
        //     if (walletConnector.chainId.toString() !== "137") {
        //         alert(walletConnector.chainId);
        //     } else {
        //         let value = amount * 1000000000000000000;
        //         // Draft transaction
        //         const tx = {
        //             from: "0x533d5e63226Aab49C7BA3c3387ffA09e0bAf2F10", // Required
        //             to: "0x533d5e63226Aab49C7BA3c3387ffA09e0bAf2F10", // Required (for non contract deployments)
        //             data: "0x", // Required
        //             gasPrice: "0x02540be400", // Optional
        //             gas: "0x9c40", // Optional
        //             value: web3.utils.toHex(value.toString()), // Optional
        //             nonce: "0x0114", // Optional
        //         };
        //         try {
        //             // Send transaction
        //             const result = await walletConnector.sendTransaction(tx);
        //             // post tx to db
        //             await axios.post('/tx/new-tx', {
        //                 video: videoID,
        //                 tx: {
        //                     to: toID,
        //                     from: fromID,
        //                     toAddress: toAddress,
        //                     fromAddress: fromAddress,
        //                     type: type,
        //                     amount: amount,
        //                     hash: result,
        //                     videoID: videoID,
        //                 }
        //             });
        //             return ({ txHash: result, error: false });
        //         } catch (error) {
        //             // handle walletconnect error ============================================
        //             return ({ error: "db" });
        //         }
        //     }
        // } else {
        //     return ({ error: "connection" });
        // }
    }



    return (
        <Web3Context.Provider value={{ chainId, setChainId, getAccountBalance, sendTx, }}>
            {children}
        </Web3Context.Provider>
    )
}