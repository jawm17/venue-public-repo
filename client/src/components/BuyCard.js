import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Confetti from "./Confetti";
import { createCheckoutWithCardElement } from "@paperxyz/js-client-sdk";
import { useHistory } from "react-router-dom";
import "./styles/buyCardStyle.css";

export default function BuyCard(props) {
    const history = useHistory();
    const [selectedCard, setSelectedCard] = useState(2);
    const [price, setPrice] = useState(25);
    const [reviewingPayment, setReviewingPayment] = useState(false);
    const [checkingOut, setCheckingOut] = useState(false);
    const [successfulTx, setSuccessfulTx] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [paperData, setPaperData] = useState(null);
    const { isAuthenticated, user, getBalance } = useContext(AuthContext);
    const [uniquePaperElementId, setUniquePaperElementId] = useState("");
    const [transactionSubmitted, setTransactionSubmitted] = useState(false);
    const [tokenQuantity, setTokenQuantity] = useState(25 * 10 ** 6);
    const [fee, setFee] = useState()
    // let transactionSubmitted = false; 

    useEffect(() => {
        if (selectedCard === 1) {
            setTokenQuantity(10 * 10 ** 6);
            setFee(0.92);
            setPrice(10);
        } else if (selectedCard === 2) {
            setTokenQuantity(25 * 10 ** 6);
            setFee(1.65);
            setPrice(25);
        } else if (selectedCard === 3) {
            setTokenQuantity(100 * 10 ** 6);
            setFee(5.33);
            setPrice(100);
        }
    }, [selectedCard]);

    useEffect(() => {
        if (checkingOut) {
            getPaperIntent();
        }
    }, [checkingOut]);

    useEffect(() => {
        const uniqueId = Math.floor(Math.random() * 10000) + 1;
        setUniquePaperElementId("paper-checkout-container" + uniqueId);
    }, []);

    async function getPaperIntent() {
        setReviewingPayment(true);
        const { data } = await axios.post("/tx/get-paper-intent", { walletAddress: user.address, email: user.email, amount: tokenQuantity });
        if (!data.paperData?.sdkClientSecret) {
            setErrorMsg("Error encountered. Please try again later.");
        } else {
            createCheckoutWithCardElement({
                sdkClientSecret: data.paperData.sdkClientSecret,
                elementOrId: uniquePaperElementId,
                appName: "Venue",
                options: {
                    colorBackground: '#14171A',
                    colorPrimary: '#00fc00',
                    colorText: 'white',
                    borderRadius: 6,
                    inputBackgroundColor: '#1B1F21',
                    inputBorderColor: '#3d4950',
                },
                onError(error) {
                    console.error("Payment error:", error);
                    setErrorMsg("Error encountered. Please try again later.");
                },
                onPaymentSuccess({ id }) {
                    // localStorage.setItem("txCount", props.txCount + 1);
                    // props.purchaseDone();
                    setSuccessfulTx(true);
                },
            });
        }
    }

    async function submitTransaction(id) {
        setTransactionSubmitted(true);
        try {
            const { data } = await axios.post("/tx/deposit-initiated", {
                tx: {
                    to: user._id,
                    toAddress: user.address,
                    type: "deposit",
                    amount: price,
                    hash: id,
                }
            });
            if (!data.success) {
                setErrorMsg("Error encountered. Please try again later.");
            } else {
                props.purchaseDone();
            }
        } catch (error) {
  
        }
    }

    const CardSelection = () => {
        return (
            <div>
                <svg onClick={() => props.cancel()} id="closeCards" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <div id="buyCardTitle">
                    Buy Credits
                </div>
                <div id="etherealCardSub">
                    Credits represent your spending balance on venue and may be withdrawn at any time. <mark id="learnMoreCards" onClick={() => history.push("/blog/etherplay")}>learn more</mark>
                </div>

                <div id="cardOptionArea">
                    <div className="cardOption" id={selectedCard === 1 ? "selectedCard" : ""} onClick={() => setSelectedCard(1)}>
                        <img className="cardImage" src="https://static.vecteezy.com/system/resources/thumbnails/006/618/465/small/holographic-background-iridescent-foil-glitch-hologram-pastel-neon-rainbow-ultraviolet-metallic-paper-template-for-presentation-cover-to-web-design-abstract-colorful-gradient-free-vector.jpg"></img>
                        <div className="cardTitle">10 Credits</div>
                        <div className="cardAmount">
                            $10
                        </div>
                    </div>
                    <div className="cardOption" id={selectedCard === 2 ? "selectedCard" : ""} onClick={() => setSelectedCard(2)}>
                        <img className="cardImage" src="https://static.vecteezy.com/system/resources/thumbnails/006/618/465/small/holographic-background-iridescent-foil-glitch-hologram-pastel-neon-rainbow-ultraviolet-metallic-paper-template-for-presentation-cover-to-web-design-abstract-colorful-gradient-free-vector.jpg"></img>
                        <div className="cardTitle">25 Credits</div>
                        <div className="cardAmount">
                            $25
                        </div>
                    </div>
                    <div className="cardOption" id={selectedCard === 3 ? "selectedCard" : ""} onClick={() => setSelectedCard(3)}>
                        <img className="cardImage" src="https://static.vecteezy.com/system/resources/thumbnails/006/618/465/small/holographic-background-iridescent-foil-glitch-hologram-pastel-neon-rainbow-ultraviolet-metallic-paper-template-for-presentation-cover-to-web-design-abstract-colorful-gradient-free-vector.jpg"></img>
                        <div className="cardTitle">100 Credits</div>
                        <div className="cardAmount">
                            $100
                        </div>
                    </div>
                </div>

                <div id="amounts">
                    <div className="amountRow">
                        <div>price</div><div>${price}</div>
                    </div>
                    <div className="amountRow">
                        <div>processing fee</div><div>~ ${fee}</div>
                    </div>
                    <div className="amountLine">

                    </div>
                    <div className="amountRow">
                        <div>total</div><div>${price + fee}</div>
                    </div>
                </div>

                <div id="checkoutBtn" onClick={() => setCheckingOut(true)}>
                    continue
                </div>
            </div>
        )
    }

    const CheckoutMain = () => {
        return (
            <div>
                <svg onClick={() => props.cancel()} id="closeCards" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div id="buyCardTitle">
                    Checkout
                </div>

                <div id="cardCheckoutPreview">

                </div>
                <div id="amounts">
                    <div className="amountRow">
                        <div>price</div><div>${price}</div>
                    </div>
                    <div className="amountRow">
                        <div>venue fee 3.4%</div><div>${Math.round(price * 0.0340 * 100) / 100}</div>
                    </div>
                    <div className="amountLine">

                    </div>
                    <div className="amountRow">
                        <div>total</div><div>${price + Math.round(price * 0.0340 * 100) / 100}</div>
                    </div>
                </div>


                <div id="checkoutBtn" onClick={() => setCheckingOut(true)}>
                    Checkout
                </div>
            </div>
        );
    }

    const PaperCheckout = () => {
        return (
            <div id={user.email ? "checkoutMainMini" : "checkoutMain"}>
                <svg onClick={() => props.cancel()} id="closeCards" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div id="buyCardTitle">
                    Checkout
                </div>
                <div id="paperLoaderFlex">
                    <div id="paperLoader">
                    </div>
                </div>
                <div id={uniquePaperElementId} className="paperElement" />
            </div>
        )
    }

    const SuccessDisplay = () => {
        const [depostConfirmed, setDepositConfirmed] = useState(false);
        useEffect(() => {
            setTimeout(() => {
                setDepositConfirmed(true);
                // getBalance(); 
                setTimeout(() => {
                    getBalance();
                    props.purchaseDone();
                }, 1200);
            }, 7000);
        }, []);
        return (
            <div id="checkoutSuccess">
                <svg onClick={() => props.cancel()} id="closeCards" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div id="buyCardTitle">
                    Checkout
                </div>
                <div id="paperSuccessLoaderFlex">
                    {depostConfirmed ?
                        <svg id="paperSuccessIcon" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                        </svg>
                        :
                        <div id="paperLoader">
                        </div>
                    }
                </div>
                <div id="paperSuccessText">
                    {depostConfirmed ? "deposit confirmed" : "confirming deposit"}
                </div>
            </div>
        );
    }

    const ErrorDisplay = () => {
        return (
            <div id="errorDisplayCheckout">
                <svg onClick={() => props.cancel()} id="closeCards" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div id="checkoutErrorMsg">
                    {errorMsg}
                </div>
            </div>
        );
    }

    const CardAnimation = () => {
        return (
            <div id="animationCard">
                <Confetti element={"animationCard"} />
            </div>
        );
    }

    return (
        <div id="buyCardOuter">
            <div id="cancelSpace" onClick={() => props.cancel()}>
            </div>
            <div id="buyCard">
                {errorMsg ? <ErrorDisplay /> : null}
                {checkingOut ? successfulTx ? <SuccessDisplay /> : <PaperCheckout /> : <CardSelection />}
            </div>
        </div>

    );
}