import axios from "axios";
// import NodeWalletConnect from "@walletconnect/node";
var Web3 = require("web3");
var web3 = new Web3("https://polygon-rpc.com");

export async function checkPending(txID, videoID) {
    try {
        const res = await axios.post("/media/get-video-src", { videoID, txID });
        if (res.data.videoSrc) {
            return {videoSrc: res.data.videoSrc, status: "success"}
        }
    } catch (error) {
        console.log(error);
        return {status: "error"}
    }
}

export async function sendTx(toAddress, fromAddress, amount, toID, fromID, videoID, type) {
    if (localStorage.getItem("authMethod") === "metamask") {
        const txData = await sendMeta(toAddress, fromAddress, amount, toID, fromID, videoID, type);
        return txData;
    } else if (localStorage.getItem("authMethod") === "walletConnect") {
        const txData = await sendWalletConnect(toAddress, fromAddress, amount, toID, fromID, videoID, type);
        return txData;
    }
}

export async function sendMeta(toAddress, fromAddress, amount, toID, fromID, videoID, type) {
    console.log(type)
    let value = amount * 1000000000000000000;
    const transactionParameters = {
        nonce: '0x00',
        to: fromAddress,
        from: fromAddress,
        value: web3.utils.toHex(value.toString())
    };
    try {
        let chainId = web3.utils.toHex(137);
        await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chainId }] });
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        try {
            // post tx to db
            await axios.post('/tx/new-tx', {
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
        return ({ error: "meta" });
    }
}

export async function sendWalletConnect(toAddress, fromAddress, amount, toID, fromID, videoID, type) {
    // Create connector
    // const walletConnector = new NodeWalletConnect(
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
    // if (walletConnector.chainId !== 137) {
    //     alert("please switch networks to polygon");
    // } else {
    //     let value = amount * 1000000000000000000;
    //     // Draft transaction
    //     const tx = {
    //         from: "0x533d5e63226Aab49C7BA3c3387ffA09e0bAf2F10", // Required
    //         to: "0x533d5e63226Aab49C7BA3c3387ffA09e0bAf2F10", // Required (for non contract deployments)
    //         data: "0x", // Required
    //         gasPrice: "0x02540be400", // Optional
    //         gas: "0x9c40", // Optional
    //         value: web3.utils.toHex(value.toString()), // Optional
    //         nonce: "0x0114", // Optional
    //     };
    //     // Send transaction
    //     const result = await walletConnector.sendTransaction(tx);
    //     try {
    //         // post tx to db
    //         await axios.post('/tx/new-tx', {
    //             video: videoID,
    //             tx: {
    //                 to: toID,
    //                 from: fromID,
    //                 toAddress: toAddress,
    //                 fromAddress: fromAddress,
    //                 type: type,
    //                 amount: amount,
    //                 hash: result,
    //                 videoID: videoID,
    //             }
    //         });
    //         return ({ txHash: result, error: false });
    //     } catch (error) {
    //         return ({ error: "db" });
    //     }
    // }
}

export async function getAccountBalance(address) {
    const bal = await web3.eth.getBalance(address);
    return bal / 1000000000000000000;
}