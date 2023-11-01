import React from "react";
import { useHistory } from "react-router-dom";
import "./searchPageStyle.css";

export default function UserSearchResult(props) {
    const history = useHistory();

    return (
        <div >
        <div className="userResult" onClick={() => history.push("/user/" + props.username)}>
            <div className="userResultHero">
                <img className="userResultHeroImg" src={props.heroImg}></img>
                <img className="userResultProfileImg" src={props.profileImg}></img>
            </div>
            <div className="userResultName">
                {props.username}
            </div>
            <div className="userResultStats">
                {props.followers} followers
            </div>
        </div>
        </div>
    );
}