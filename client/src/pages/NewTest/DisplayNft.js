import React, {useState} from "react";

export default function DisplayNft(props) {
    const [error, setError] = useState(false);

    function mediaError() {
        console.log("error: " + props.media);
        setError(true);
    }

    return (
        <div className="displayNft" style={error ? {"display": "none"} : {"display": "inline-block"}}>
            <div id="nftFlex">
                {props.type === "vid" ?
                    <video className="nftVid" width="320" height="240" autoPlay muted loop>
                        <source src={props.media} type="video/mp4" onError={() => mediaError()} />
                    </video> :
                    <img src={props.media} className="nftImage" onError={() => mediaError()}/>
                }
                <div className="texty">
                    {props.media}
                </div>
            </div>
        </div>
    );
}