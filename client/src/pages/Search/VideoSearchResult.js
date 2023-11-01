import React from "react";
import { useHistory } from "react-router-dom";
import "./searchPageStyle.css";

export default function VideoSearchResult(props) {
    const history = useHistory();

    return (
        <div className="resultGridBox">
            <div className="previewComponent" onClick={() => history.push("/video/" + props.videoID)}>
                <div className="previewImgDiv">
                    <img className="previewImg" src={props.thumb}></img>
                </div>
                <div className="previewTitle">
                    {props.title}
                </div>
                <div className="previewUser">
                    <img className="previewUserPic" src={props.userPic}></img>
                    <div className="previewUserName">
                        {props.username}
                    </div>
                </div>
            </div>
        </div>
    );
}