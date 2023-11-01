import React, { useEffect, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./styles/NotificationsModalStyle.css";

export default function Notification(props) {
    const history = useHistory();
    const [link, setLink] = useState("");
    const [statusStyle, setStatusStyle] = useState("var(--green)");

    const TxText = (props) => {
        if (props.message.type === "tip") {
            setLink("/user/" + props.message.from.username);
            return (
                <div className="ActivityTxText">
                    <mark className="greenText">{props.message.from.username}</mark> tipped you <mark className="greenText">${props.message.amount}</mark>
                </div>
            );
        } else if (props.message.type === "unlock") {
            setLink("/video/" + props.message.videoID);
            return (
                <div className="ActivityTxText">
                    <mark className="greenText">{props.message.from.username}</mark> unlocked your video for <mark className="greenText">${props.message.amount}</mark>
                </div>
            );
        } else if (props.message.type === "comment") {
            setLink("/video/" + props.message.videoID);
            return (
                <div className="ActivityTxText">
                    <mark className="greenText">{props.message.from.username}</mark> commented on your video
                </div>
            );
        } else if (props.message.type === "like") {
            setLink("/video/" + props.message.videoID);
            return (
                <div className="ActivityTxText">
                    <mark className="greenText">{props.message.from.username}</mark> liked your video
                </div>
            );
        }  else if (props.message.type === "text") {
            setLink("/video/" + props.message.videoID);
            return (
                <div className="ActivityTxText">
                    {props.message.textContent}
                </div>
            );
        }
    }
    if (props.message.type === "direct") {
        return null;
    } else {
        return (
            <div className="notificationEl" onClick={() => history.push(link)}>
                <img className="activityElImg" src={props.message.from.profileImg}></img>
                <div className="activityTextTime">
                    <TxText message={props.message} />
                    <div className="activityTime">{moment(props.message.createdAt).format("LLL")}</div>

                </div>
                {/* <div className="activityStatus" style={{ backgroundColor: statusStyle }}></div> */}
            </div>
        );
    }
}