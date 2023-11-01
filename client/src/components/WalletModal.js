import React, { useEffect, useState } from "react";
import PersonalActivityTx from "./PersonalActivityTx";
import CollectionElement from "./CollectionElement";
import BuyCard from "./BuyCard";
import axios from "axios";
import "./styles/walletModalStyle.css";

export default function WalletModal(props) {
    const [transactions, setTransactions] = useState([]);
    const [walletContent, setWalletContent] = useState("txs");
    const [cardWindow, setCardWindow] = useState(false);
    const [collection, setCollection] = useState([{}, {}, {}]);

    useEffect(() => {
        getTransactions();
    }, []);

    async function getTransactions() {
        try {
            const { data } = await axios.post("/tx/get-all-txs", { userID: props.user._id });

            setTransactions(data.txs.reverse());
        } catch (error) {
    
        }
    }

    return (
        <div>
            {cardWindow ?
                <BuyCard cancel={() => setCardWindow(false)} purchaseDone={() => setCardWindow(false)} />
                :
                <div>
                    <div id="modalBlur" onClick={() => props.cancel()}></div>
                    <div id="walletModal">
                        <div id="walletModalTop">
                            <svg onClick={() => props.cancel()} id="closeModalBtn" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div id="walletTitle">
                                {props.user?.username}'s wallet
                            </div>
                            <div id="walletInfoArea">
                                <div className="walletInfo">
                                    <mark className="walletInfoLabel">Balance:</mark> $5,450
                                </div>
                                <div className="walletInfo">
                                    <mark className="walletInfoLabel">Collection Value:</mark> $43,400
                                </div>
                                {/* <div className="walletInfo">
                                    <mark className="walletInfoLabel">Address:</mark> {props.user?.address.slice(0, 12)}...{props.user?.address.slice(props.user?.address.length - 8, props.user?.address.length)}
                                </div> */}
                            </div>
                            <div id="walletBtnArea">
                                <div className="walletBtn" onClick={() => setCardWindow(true)}>add funds</div>
                                <div className="walletBtn">withdraw</div>
                            </div>
                            <div id="walletMenuArea">
                                <div className="walletMenuBtn" onClick={() => setWalletContent("txs")} id={walletContent === "txs" ? "selectedWalletBtn" : ""}>
                                    transactions
                                </div>
                                <div className="walletMenuBtn walletCollectionBtn" onClick={() => setWalletContent("collection")} id={walletContent === "collection" ? "selectedWalletBtn" : ""}>
                                    collection
                                </div>
                            </div>
                        </div>
                        <div id="walletModalBottom">
                            {walletContent === "txs" ? transactions.map(tx => {
                                return (
                                    <PersonalActivityTx
                                        tx={tx}
                                        key={tx._id}
                                        username={props.user.username}
                                    />
                                )
                            })
                                :
                                collection.map((collectible, index) => {
                                    return (
                                        <CollectionElement
                                            index={index}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}