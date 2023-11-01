import React from "react";
import "./styles/videoPlayerStyle.css";

export default function VideoPlayer(props) {

    return (
        <div id="videoPlayerBg">
            <video autoPlay={true} id="mediaPlayer" controls controlsList="nodownload" muted webkit-playsinline playsInline>
                <source src={props.src} type="video/mp4" />
                        Your browser does not support the video tag.
            </video>
        </div>
    );
}