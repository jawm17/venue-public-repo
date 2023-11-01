import React from "react";
import { useHistory } from "react-router-dom";
import "./styles/topTipperStyle.css";

export default function TopTipper(props) {
    const history = useHistory();

    return (
        <div className="tipperDiv" onClick={() => history.push("/user/" + props.tipper.username)}>
            <div className="tipperFlex">
                <div className="tipperRank">
                    {props.index + 1}
                </div>
                <img className="tipperPic" src={props.tipper.profileImg}></img>
                <div className="tipperInfo">
                    <div>
                    <div className="tipperName">
                        {props.tipper.username}
                    </div>
                    <div className="tipperAmount">
                        {props.tip.amount} ETH
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}