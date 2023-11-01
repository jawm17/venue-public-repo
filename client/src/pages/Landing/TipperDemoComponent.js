import React from "react";
import { useHistory } from "react-router-dom";
import "./styles/topTippersStyle.css";

export default function TopTipper(props) {
    const history = useHistory();

    return (
        <div className="tipperDiv" onClick={() => history.push("/user/" + props.name)}>
            <div className="tipperFlex">
                <div className="tipperRank">
                    {props.index + 1}
                </div>
                <img className="tipperPic" src={props.profileImg}></img>
                <div className="tipperInfo">
                    <div>
                    <div className="tipperName">
                        {props.name}
                    </div>
                    <div className="tipperAmount" style={{"font-family" : "font-2535", "font-size" : 10, "margin-top": 3}}>
                        ${props.amount}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}