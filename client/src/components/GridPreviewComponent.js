import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/previewComponentStyle.css";

export default function GridPreviewComponent(props) {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={props.index === 0 ? "firstPreviewOuter" : "previewOuter"}>
            <div className="topPreviewComponent" onClick={() => history.push("/video/" + props.videoID || "6237e2558c3d2831b47afffd")}>
                <div className="previewImgDiv">
                    <img onLoad={() => setLoaded(true)} className="previewImg" src={props.thumb} style={loaded ? { display: "initial" } : { display: "none" }}></img>
                    <div className="previewPriceTag">
                       {props.price ? ("$" + props.price) : "FREE"}
                    </div>
                </div>

                <div className="previewInfo">
                    <div className="previewInfoLeft">
                        <div className="previewTitle">
                            {props.title}
                        </div>
                        <div className="previewViews">
                            <div className="fadeElement">

                            </div>
                            <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 12C19.25 13 17.5 18.25 12 18.25C6.5 18.25 4.75 13 4.75 12C4.75 11 6.5 5.75 12 5.75C17.5 5.75 19.25 11 19.25 12Z"></path>
                                <circle cx="12" cy="12" r="2.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                            </svg>
                            <div>
                                {props.views || 0}
                            </div>
                        </div>
    
                    </div>

                    <div className="previewInfoRight">

                    <div className="previewUser">
                            <img className="previewUserPic" src={props.userPic}></img>
                            <div className="previewUserName">
                                {props.username}
                            </div>
                        </div>
                        <div className="previewTime">
                            12:13
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}