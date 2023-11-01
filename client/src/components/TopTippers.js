import React from "react";
import "./styles/topTippersStyle.css";

export default function TopTippers(props) {
    const Tipper = (props) => {
        return (
            <div className="tipper">
                <img className="tipperImg" src={props.profileImg} />
                <div className="tipperInfo" id={props.index === 0 ? "firstTipper" : null}>
                    {props.username} <span className="tipperAmount">${(Math.round(props.amount * 100000) / 100000).toFixed(5).replace(/\.?0+$/, '')}</span>
                </div>
            </div>
        )
    }

    return (
        <div id="topTippers">
            <div id="topTippersTitle">
                Top Tippers
            </div>
            <div id="topTippersFlex">
                {props.supporters.map((supporter, index) => {
                    return (
                        <Tipper
                            index={index}
                            profileImg={supporter.from.profileImg}
                            username={supporter.from.username}
                            amount={supporter.amount}
                            key={supporter.from.address}
                        />
                    )
                })}
            </div>
        </div>
    );
}