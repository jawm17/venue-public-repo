import React from "react";
import { useHistory } from "react-router-dom";
import "./styles/topUserStyle.css";

export default function TopUser(props) {
    const history = useHistory();

    return (
        <div className={props.index === 0 ? "firstTopUserDiv" : "topUserDiv"} onClick={() => history.push("/user/" + props.username)}>
            <div className="topUserFlex">
                <div className="topUserRank">
                    {props.index + 1}
                </div>
                <img className="topUserPic" src={props.profileImg}></img>
                <div className="topUserInfo">
                    <div>
                        <div className="topUserName">
                            {props.username}
                        </div>
                        <div className="topUserAmount">
                            ${props.amount.toFixed(2)}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}