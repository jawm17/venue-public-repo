import React, { useEffect, useState } from "react";
import moment from "moment";
import "./styles/activityTxStyle.css";

export default function PersonalActivityTx(props) {
    const [statusStyle, setStatusStyle] = useState("");
    const [sentFromUser, setSentFromUser] = useState(false);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const createdAt = new Date(props.tx.createdAt);
        const now = new Date();
        const fifteenSecondsAgo = new Date(now - 15 * 1000);

        if (createdAt > fifteenSecondsAgo && createdAt <= now) {
            // setPending(true);
            // setTimeout(() => {
            //     setPending(false);  
            // }, 15000);
        }
        if (!props.tx.pendingDeposit) {
            if (props.tx.type === "deposit") {
                setSentFromUser(false);
                setStatusStyle("var(--green)");
            } else if (props.username == props.tx.from.username) {
                setSentFromUser(true);
                setStatusStyle("red");
            } else {
                setSentFromUser(false);
                setStatusStyle("var(--green)");
            }
        }
    }, []);

    const TxText = (props) => {
        if (props.tx.type === "deposit") {
            return (
                <div className="ActivityTxText">
                    deposited <mark className="greenText">${props.tx.amount}</mark>
                </div>
            );
        } else if (props.tx.type === "unlock") {
            if (sentFromUser) {
                return (
                    <div className="ActivityTxText">
                        sent a <mark className="greenText">${props.tx.amount}</mark> payment to <mark className="greenText">{props.tx.to.username}</mark>
                    </div>
                );
            } else {
                return (
                    <div className="ActivityTxText">
                        recieved a <mark className="greenText">${props.tx.amount}</mark> payment from <mark className="greenText">{props.tx.from.username}</mark>
                    </div>
                );
            }
        } else if (props.tx.type === "tip") {
            if (sentFromUser) {
                return (
                    <div className="ActivityTxText">
                        sent a <mark className="greenText">${props.tx.amount}</mark> tip to <mark className="greenText">{props.tx.to.username}</mark>
                    </div>
                );
            } else {
                return (
                    <div className="ActivityTxText">
                        recieved a <mark className="greenText">${props.tx.amount}</mark> tip from <mark className="greenText">{props.tx.from.username}</mark>
                    </div>
                );
            }
        }
    }
    if (props.tx.type === "direct") {
        return null;
    } else if (props.tx.pendingDeposit) {
        return (
            <div className="personalActivityEl">
                <div className="activityTextTime">
                    <div className="ActivityTxText">
                        pending deposit
                    </div>

                </div>
                <div className="activityLoader"></div>
            </div>
        );
    } else {
        return (
            <div className="personalActivityEl" onClick={() => window.open("https://polygonscan.com/tx/" + props.tx.hash)}>
                <div className="activityTextTime">
                    <TxText tx={props.tx} />
                    <div className="activityTime">{moment(props.tx.createdAt).format("LLL")}</div>

                </div>
                {pending ? <div className="activityLoader"></div> : <div className="activityStatus" style={{ backgroundColor: statusStyle }}></div>}
            </div>
        );
    }
}