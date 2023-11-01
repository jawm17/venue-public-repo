import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/videoPreviewStyle.css";

export default function VideoPreview(props) {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false)

    return (
        <div>
            <div className="previewComponent" onClick={() => history.push("/video/" + props.videoID)}>
                <div className="previewImgDiv">
                    <img onLoad={() => setLoaded(true)} className="previewImg" src={props.thumb}></img>
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