import React from "react";
import { useHistory } from "react-router-dom";
import "./styles/topSupportersStyle.css";

export default function TopSupporters(props) {
    const history = useHistory();

    const Supporter = (props) => {
        return (
            <div className="supporter">
                <img className="supporterImg" src={props.profileImg} />
                <div className="supporterInfo">
                    {props.username} <span className="supporterAmount">${(Math.round(props.amount * 100000) / 100000).toFixed(5).replace(/\.?0+$/, '')}</span>
                </div>
            </div>
        )
    }

    return (
        <div id="topSupporters">
            <div id="topSupportersTitle">
                Top Supporters
            </div>
            <div id="topSupportersFlex">
                {props.supporters.map(supporter => {
                    return (
                        <Supporter
                            profileImg={supporter.profileImg}
                            username={supporter.username}
                            amount={supporter.amount}
                            key={supporter.address}
                        />
                    )
                })}
            </div>
        </div>
    );
}