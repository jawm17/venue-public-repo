import React, { useEffect } from "react";
import HeaderMain from "../../components/HeaderMain";
import { useHistory } from "react-router-dom";
import "./leaderboardStyle.css"

export default function LeaderboardRow(props) {
    const history = useHistory();

    useEffect(() => {

    }, []);

    return (
        <div className="leaderRow" onClick={() => history.push("/user/" + props.name)}>
           <div className="leaderPosition">{props.position}</div>   
           <img className="leaderPic" src={props.profileImg}></img>  
           <div className="leaderName">{props.name}</div>
           <div className="leaderAmount">${props.solEarned}</div>        
        </div>
    );
}
