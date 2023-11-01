import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./styles/activityTxStyle.css";

export default function ActivityTx(props) {
    const history = useHistory();
    const [statusStyle, setStatusStyle] = useState("var(--green)");

    useEffect(() => {
        if (props.tx.status === "pending") {
            setStatusStyle("var(--green)");
        } else if (props.tx.status === "failed") {
            setStatusStyle("var(--green)");
        }
    }, []);

    const TxText = (props) => {
        if (props.tx.type === "unlock") {
            return (
                <div className="ActivityTxText">
                    <mark className="greenText">{props.tx.from.username}</mark> unlocked <mark className="greenText">{props.tx.to.username + "'s"}</mark> video for <mark className="greenText">${props.tx.amount}</mark>
                </div>
            );
        } else if (props.tx.type === "tip") {
            return (
                <div className="ActivityTxText">
                    <mark className="greenText">{props.tx.from.username}</mark> sent a <mark className="greenText">${props.tx.amount}</mark> tip to <mark className="greenText">{props.tx.to.username}</mark>
                </div>
            );
        }
    }
    if (props.tx.type === "direct") {
        return null;
    } else {
        return (
            <div className="activityEl" onClick={() => history.push("/user/" + props.tx.from.username)}>
                <img className="activityElImg" src={props.tx.from.profileImg}></img>
                <div className="activityTextTime">
                    <TxText tx={props.tx} />
                    <div className="activityTime">{moment(props.tx.createdAt).format("LLL")}</div>

                </div>
                <div className="activityStatus" style={{ backgroundColor: statusStyle }}></div>
            </div>
        );
    }
}