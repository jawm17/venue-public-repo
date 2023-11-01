import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import PersonalActivityTx from "../../components/PersonalActivityTx";
import CollectionElement from "../../components/CollectionElement";
import BuyCard from "../../components/BuyCard";
import HeaderMain from "../../components/HeaderMain";
import WithdrawModal from "./WithdrawModal";
import axios from "axios";
import "./styles/walletPageStyle.css";

export default function WalletPage(props) {
    const [transactions, setTransactions] = useState([]);
    const [walletContent, setWalletContent] = useState("txs");
    const [cardWindow, setCardWindow] = useState(false);
    const [collection, setCollection] = useState([]);
    const [withdrawing, setWithdrawing] = useState(false)
    const { user, balance, getBalance } = useContext(AuthContext);

    useEffect(() => {
        getTransactions();
        getBalance();
    }, []);

    async function getTransactions() {
        try {
            const { data } = await axios.post("/tx/get-all-txs", { userID: user._id });
            console.log(data);
            setTransactions(data.txs.reverse());
        } catch (error) {
            console.log(error);
        }
    }

    function purchaseDone() {
        setCardWindow(false);
        getTransactions();
    }

    return (
        <div>
            <HeaderMain />
            {withdrawing ? <WithdrawModal cancel={() => setWithdrawing(false)}/> : null}
            {cardWindow ? <BuyCard txCount={transactions.length} cancel={() => setCardWindow(false)} purchaseDone={() => purchaseDone()} /> : null}
            <div id="walletPage">
                <div id="walletModalTop">
                    <div id="walletTitle">
                        {user?.username}'s wallet
                    </div>
                    <div id="walletInfoArea">
                        <div className="walletInfo">
                            <mark className="walletInfoLabel">Balance:</mark> ${balance}
                        </div>
                        <div className="walletInfo">
                            <mark className="walletInfoLabel">Total Earned</mark> ${user?.solEarned}
                        </div>
                        {/* <div className="walletInfo">
                            <mark className="walletInfoLabel">Address:</mark> {user?.address}
                        </div> */}
                    </div>
                    <div id="walletBtnArea">
                        <div className="walletBtn" onClick={() => setCardWindow(true)}>add funds</div>
                        <div className="walletBtn" onClick={() => setWithdrawing(true)}>withdraw</div>
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
                    {walletContent === "txs" ?
                        transactions.length > 0 ?
                            transactions.map(tx => {
                                return (
                                    <PersonalActivityTx
                                        tx={tx}
                                        key={tx._id}
                                        username={user?.username}
                                    />
                                )
                            }) :
                            <div id="noTxsMessage">you have 0 transactions</div>
                        :
                        collection.length > 0 ?
                            collection.map((collectible, index) => {
                                return (
                                    <CollectionElement
                                        index={index}
                                    />
                                )
                            })
                            :
                            <div id="noTxsMessage">you have 0 collectibles</div>
                    }
                    <div id="walletPageSpacer">

                    </div>
                </div>
            </div>
        </div>
    );
}