import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Confetti from "./Confetti";
import { createCheckoutWithCardElement } from "@paperxyz/js-client-sdk";
import { useHistory } from "react-router-dom";
import diamond from "../assets/diamondIcon.png";
import gold from "../assets/goldIconWhite.png";
import "./styles/collectModalStyle.css";

export default function CollectModal(props) {
    const [paperData, setPaperData] = useState(null);
    const [reviewingPayment, setReviewingPayment] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [checkingOut, setCheckingOut] = useState(false);
    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {

        if (checkingOut) {
            getPaperIntent()
        }
    }, [checkingOut]);

    async function getPaperIntent() {
        setReviewingPayment(true);
        const { data } = await axios.post("/tx/get-paper-intent", { contractId: "9c35ad33-0631-4812-a3ad-84db21dd521d", walletAddress: user.address, email: user.email });
        if (!data.paperData?.sdkClientSecret) {
            setErrorMsg("Error encountered. Please try again later.");
        } else {
            createCheckoutWithCardElement({
                sdkClientSecret: data.paperData.sdkClientSecret,
                elementOrId: "paper-checkout-container",
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
                async onPaymentSuccess({ id }) {
                    const { data } = await axios.post("/tx/nft-minted", { ownerAddress: user.address, txId: id, paymentMethod: "card" });
                    if (!data.success) {
                        setErrorMsg("Error encountered. Please try again later.");
                    } else {
                        props.purchaseDone();
                        // setSuccessfulTx(true);
                    }
                },
            });
        }
    }

    if (checkingOut) {
        return (
            <div id="collectModalOuter">
                <div id="collectModalBody">
                    <div id="collectModalTop">
                        <div id="collectModalTitle">
                            Collect {props.unlocking ? "to unlock" : props.user?.username}
                        </div>
                        <svg onClick={() => props.close()} id="closeCollectionModal" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div id="collectCheckoutContainer">
                        <div id="paper-checkout-container" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div id="collectModalOuter">
            <div id="collectModalBody">
                <div id="collectModalTop">
                    <div id="collectModalTitle">
                        Collect {props.unlocking ? "to unlock" : props.user?.username}
                    </div>
                    <svg onClick={() => props.close()} id="closeCollectionModal" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div id="collectOption" style={{ backgroundImage: `url(${props.user?.heroImg})` }}>
                    <div id="collectOptionCover">
                        <img id="collectProfileImg" src={props.user?.profileImg}></img>
                        <div id="collectName">
                            {props.user?.username}
                        </div>
                        {/* <div className="nftLevelBadge" id="gold">
                            <img src={gold} className="nftBadgeIcon" id="goldIcon"></img><div>gold</div>
                        </div> */}
                    </div>
                </div>
                <div id="collectBenefits">
                    <div id="collectBenefitsTitle">
                        gold collector benefits:
                    </div>
                    <div className="cBenefit">
                        <svg className="cBenefitIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 5V19"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.25 5V19"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8.75H7.5"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8.75H19"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12H19"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 15.25H7.5"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 15.25H19"></path>
                        </svg>
                        <div>
                            exclusive content
                        </div>
                    </div>
                    <div className="cBenefit">
                        <svg className="cBenefitIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15.5V12.75"></path>
                        </svg>
                        <div>
                            chat with creator
                        </div>
                    </div>
                    <div className="cBenefit">
                        <svg className="cBenefitIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 11.25L10.25 5.75"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 19.2502H6.25C6.80229 19.2502 7.25 18.8025 7.25 18.2502V15.75C7.25 15.1977 6.80229 14.75 6.25 14.75H5.75C5.19772 14.75 4.75 15.1977 4.75 15.75V18.2502C4.75 18.8025 5.19772 19.2502 5.75 19.2502Z"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.75 19.2502H12.25C12.8023 19.2502 13.25 18.8025 13.25 18.2502V12.75C13.25 12.1977 12.8023 11.75 12.25 11.75H11.75C11.1977 11.75 10.75 12.1977 10.75 12.75V18.2502C10.75 18.8025 11.1977 19.2502 11.75 19.2502Z"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.75 19.2502H18.25C18.8023 19.2502 19.25 18.8025 19.25 18.2502V5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H17.75C17.1977 4.75 16.75 5.19772 16.75 5.75V18.2502C16.75 18.8025 17.1977 19.2502 17.75 19.2502Z"></path>
                            <path stroke="var(--green)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.25 8.25V4.75H7.75"></path>
                        </svg>
                        <div>
                            royalties from future collects
                        </div>
                    </div>
                    {/* <div id="collectMsg">
                        by collecting this user, you will recieve a 10% share of their revenue
                    </div> */}
                </div>
                <div id="buyCollectBtn" onClick={() => setCheckingOut(true)}>
                    collect
                </div>
            </div>
        </div>
    );
}