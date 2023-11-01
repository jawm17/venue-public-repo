import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import EmailForm from './EmailForm';
import connectLogo from "../assets/walletconnect.png";
import fox from "../assets/metamask.png";
import { useHistory } from "react-router-dom";
import "./styles/authWindowStyle.css";
import { AuthContext } from "../context/AuthContext";
import { Web3Context } from "../context/Web3Context";
import { magic } from "../lib/magic";
import { useAccount, useSignMessage } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

var Web3 = require("web3");
var web3 = new Web3();

export default function AuthWindow(props) {
    const history = useHistory();
    const { isAuthenticated, setIsAuthenticated, setUser, getCardBalances } = useContext(AuthContext);
    const { setChainId } = useContext(Web3Context);
    const [loading, setLoading] = useState(false);
    const [connectStatus, setConnectStatus] = useState({ type: null, step: 0 });
    const [walletType, setWalletType] = useState("");

    const { open, close } = useWeb3Modal()
    const { address, isConnecting, isDisconnected } = useAccount()
    const { data, isError, isLoading, isSuccess, variables, signMessage, signMessageData } = useSignMessage({
        message: 'gm frens! sign this message to connect to venue.',
    })

    useEffect(() => {
        if (isAuthenticated && !props.autoConnect) {
            props.cancel();
        } else {
            // Create connector
            if (props.autoConnect) {
                if (props.autoConnect === "metamask") {
                    connectMetamask();
                }
            }
        }
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "scroll";
    }, [isAuthenticated]);

    useEffect(() => {
        if (props.googleAuth) {
            setLoading(true);
            finishSocialLogin();
        }
    }, []);

    const finishSocialLogin = async () => {
        try {
            const result = await magic.oauth.getRedirectResult();
            const headerConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + result.magic.idToken,
                }
            };
            const registrationData = {
                email: result.oauth.userInfo.email
            };
            try {
                const { data } = await axios.post("/user/googleAuth", registrationData, headerConfig);
                if (data.user) {
                    setUser(data.user);
                    // getCardBalances(data.user.address);
                    setIsAuthenticated(true);
                    localStorage.setItem("authMethod", "google");
                    history.push('/home');
                } else {
                    // ERROR HANDLING ==========================================================
                    // ERROR HANDLING ==========================================================
                    // ERROR HANDLING ==========================================================
                    // ERROR HANDLING ==========================================================
                }
            } catch (error) {

            }
            // alert(result.oauth.userInfo.email);
            history.push("/home");
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const loginUser = async (email) => {
        setLoading(true)
        try {
            let didToken = await magic.auth.loginWithEmailOTP({
                email: email,
                // redirectURI: new URL('/home', window.location.origin).href,
            });
            const headerConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + didToken,
                }
            };
            const registrationData = {
                email
            };
            try {
                const { data } = await axios.post("/user/register", registrationData, headerConfig);
                if (data.user) {
                    setUser(data.user);
                    // getCardBalances(data.user.address);
                    setIsAuthenticated(true);
                    localStorage.setItem("authMethod", "magic");
                    props.cancel();
                    // history.push('/profile');
                } else {
                    // ERROR HANDLING ==========================================================
                    // ERROR HANDLING ==========================================================
                    // ERROR HANDLING ==========================================================
                    // ERROR HANDLING ==========================================================
                }
            } catch (error) {
                // ERROR HANDLING ==========================================================
                // ERROR HANDLING ==========================================================
                // ERROR HANDLING ==========================================================
                // ERROR HANDLING ==========================================================
            }
        } catch (err) {
            setUser(null);
            setLoading(false);
        }
    };

    async function connectMetamask() {
        setConnectStatus({ type: "metamask", step: 1 });
        setWalletType("metamask");
        try {
            await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: web3.utils.toHex(137) }] });
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const msgParams = JSON.stringify({
                domain: {
                    chainId: 137
                },
                message: {
                    contents: 'Sign in to venue.market',
                },
                primaryType: 'Message',
                types: {
                    Message: [
                        { name: 'contents', type: 'string' },
                    ],
                },
            });
            var from = accounts[0];
            var params = [from, msgParams];
            var method = 'eth_signTypedData_v4';
            await window.ethereum.sendAsync({ method, params, from }, async function (error, result) {
                if (error || result.error) { return setConnectStatus({ type: null, step: 0 }) }
                const res = await axios.post("/user/connect-metamask", { msgParams, result, address: from });
                if (res.status === 200) {
                    setUser(res.data.user);
                    // getCardBalances(res.data.user.address);
                    setIsAuthenticated(true);
                    localStorage.setItem("authMethod", "metamask");
                    if (res.data.new) {
                        // alert("welcome to venue");
                    }
                }
            });
        } catch (error) {
            let denied = false;
            if (error.code === 4902) {
                // if wallet is on the wrong chain request chain change
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: web3.utils.toHex(137),
                        chainName: 'Polygon',
                        nativeCurrency: {
                            name: 'MATIC',
                            symbol: 'MATIC',
                            decimals: 18
                        },
                        rpcUrls: ['https://polygon-mainnet.infura.io/v3/295cce92179b4be498665b1b16dfee34'],
                        blockExplorerUrls: ['https://polygonscan.com']
                    }]
                }).catch((error) => {
                    if (error.code === 4001) {
                        denied = true;
                        setConnectStatus({ type: "metamask", step: 0 });
                    }
                });
                if (!denied) {
                    connectMetamask();
                }
            } else {
                setConnectStatus({ type: null, step: 0 });
            }
        }
    }

    async function walletConnect() {
        if (address) {
            // if user is already connected, allow signature request (step 2)
            setConnectStatus({ type: "walletConnect", step: 2 });
        } else {
            // connect wallet
            setConnectStatus({ type: "walletConnect", step: 1, status: "waiting" });
            open();
        }
    }

    useEffect(() => {
        if (address && connectStatus.type === "walletConnect") {
            // if user is already connected, allow signature request (step 2)
            setConnectStatus({ type: "walletConnect", step: 2 });
        }
    }, [address]);

    async function walletConnectSignature() {
        // request signature from user
        setConnectStatus({ type: "walletConnect", step: 2, status: "waiting" });
        signMessage();
    }

    useEffect(() => {
        if (variables?.message && data) {
            // if signature (data) is available, send to backend
            registerWalletConnect(variables.message, data)
        }
    }, [data, variables?.message])

    async function registerWalletConnect(rawMessage, signature) {
        try {
            // send signature to backend
            const res = await axios.post("/user/connect-walletConnect", { rawMessage, signature, address });
            if (res.status === 200) {
                setUser(res.data.user);
                // getCardBalances(res.data.user.address);
                setIsAuthenticated(true);
                localStorage.setItem("authMethod", "walletConnect");
                if (res.data.new) {
                    // alert("welcome to venue");
                }
            }
        } catch (error) {
            setConnectStatus({ type: "walletConnect", step: 2 });
        }
    }

    function closeModal() {
        props.cancel()
    }

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => verifyToken(codeResponse.access_token),
        onError: (error) => console.log('Login Failed:', error)
    });

    async function verifyToken(token) {
        try {
            const res = await axios.post("/user/googleAuth", { token });
            if (res.status === 201) {
                setUser(res.data.user);
                setIsAuthenticated(true);
                localStorage.setItem("authMethod", "google");
            }
        } catch (error) {

        }
    }

    function Dialogue() {
        if (connectStatus.type === "walletConnect") {
            return (
                <div>
                    <div className="dialogueSect">
                        <div className="dialogueBtn" onClick={connectStatus.step < 2 ? () => walletConnect() : null} id={connectStatus.step < 2 ? "readyBtn" : "doneBtn"}>
                            <div className="dialogueBtnText">
                                connect wallet
                            </div>
                            <div className="dialogueLoader" style={connectStatus.step === 1 ? { display: "initial" } : { display: "none" }}></div>
                            <div className="dialogueCheck">
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="dialogueSect">
                        <div className="dialogueBtn" onClick={connectStatus.step === 2 ? () => walletConnectSignature() : null} id={connectStatus.step > 2 ? "doneBtn" : connectStatus.step === 2 ? "readyBtn" : ""}>
                            <div className="dialogueBtnText">
                                sign message
                            </div>
                            <div className="dialogueLoader" style={connectStatus.step === 2 && connectStatus.status === "waiting" ? { display: "initial" } : { display: "none" }}></div>
                        </div>
                    </div>
                </div>
            );
        } else if (connectStatus.type === "metamask") {
            return (
                <div className="dialogueSect" onClick={connectStatus.step === 0 ? () => connectMetamask() : null}>
                    <div className="dialogueBtn" id={connectStatus.step < 2 ? "readyBtn" : "doneBtn"}>
                        <div className="dialogueBtnText">
                            connect wallet
                        </div>
                        <div className="dialogueLoader" style={connectStatus.step === 1 ? { display: "initial" } : { display: "none" }}></div>
                        <div className="dialogueCheck">
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div >
                <div id="otherAuthOptions">
                    <div id="phantomConnect" className="connectWallet" onClick={() => googleLogin()}>
                        <img id="googImg" src={"https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"} alt="phantom"></img>
                        <div>
                            google
                        </div>
                    </div>
                    {/* <div id="phantomConnect" className="connectWallet">
                        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                    </div> */}
                    <div id="metamaskConnect" className="connectWallet" onClick={() => setConnectStatus({ type: "walletConnect", step: 0 })}>
                        <img id="foxImg" src={fox} alt="phantom"></img>
                        <div>
                            Metamask
                        </div>
                    </div>
                    <div id="slopeConnect" className="connectWallet" onClick={() => setConnectStatus({ type: "walletConnect", step: 0 })}>
                        <img id="ghostImg" src={connectLogo} alt="phantom"></img>
                        <div>
                            WalletConnect
                        </div>
                    </div>
                </div>
                <div id="termsAuth">
                    <div className="termsAuthText">
                        by proceeding on this site, you agree to the
                    </div>
                    <div id="termsLink" className="termsAuthText" onClick={() => window.open("/terms")}>
                        terms
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div id="modalBlur" onClick={() => props.cancel()}></div>
            <div id="authModal">
                {loading ? <div id="authLoading"></div> : null}
                <svg onClick={() => props.cancel()} id="closeAuth" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div id="authTitle">
                    Connect
                </div>
                {
                    connectStatus.type == null ?
                        <div>
                            <div id="emailAuth">
                                {/* <div id="emailLabel">
                                    email
                                    </div> */}
                                <EmailForm onEmailSubmit={loginUser} />
                            </div>
                            <div id="authBreak">
                                <div className="lineBreak">
                                </div>
                                <div id="orLabel">
                                    or
                                </div>
                                <div className="lineBreak">
                                </div>
                            </div>
                        </div>
                        :
                        null
                }

                <Dialogue />

                <div id="cancelAuth" onClick={loading ? null : () => closeModal()}>
                    {loading ? <div className="loaderAuth"></div> : "cancel"}
                </div>
            </div>
        </>
    );
}