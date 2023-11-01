import React, { useState } from "react";
import BuyCard from "../../components/BuyCard";
import "./styles/cardElementStyle.css";

export default function CardElement(props) {
    const [cardWindow, setCardWindow] = useState(false);

    if (false) {
        return (
            <div className="walletCardBlock">
                {cardWindow ? <BuyCard cancel={() => setCardWindow(false)} /> : null}
                <div className="walletCardPrompt" onClick={() => setCardWindow(true)}>
                    <div className="walletCardPromptInner">
                        <div>
                            <div className="cardIconFlex">
                                <svg id="cardIcon" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>
                            </div>
                            <div>
                                buy card
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="walletCard">
                <div className="walletCardInner">
                    <img className="walletCardImage" src="https://static.vecteezy.com/system/resources/thumbnails/006/618/465/small/holographic-background-iridescent-foil-glitch-hologram-pastel-neon-rainbow-ultraviolet-metallic-paper-template-for-presentation-cover-to-web-design-abstract-colorful-gradient-free-vector.jpg"></img>
                    <div className="walletCardName">
                        ETHEREAL CARD
                    </div>
                    <div className="walletCardBalance">
                        balance: ${props.balance / 10 ** 6}
                    </div>
                </div>
            </div>
            // <div className="walletCard">
            //     <div className="walletCardImageName">
            //         <img className="walletCardImage" src="https://static.vecteezy.com/system/resources/thumbnails/006/618/465/small/holographic-background-iridescent-foil-glitch-hologram-pastel-neon-rainbow-ultraviolet-metallic-paper-template-for-presentation-cover-to-web-design-abstract-colorful-gradient-free-vector.jpg"></img>
            //         <div className="walletCardName">
            //             ethereal card
            //         </div>
            //     </div>
            //     <div className="walletCardBalance">
            //         Balance: ${props.balance / 10 ** 6}
            //     </div>
            // </div>
        );
    }
}