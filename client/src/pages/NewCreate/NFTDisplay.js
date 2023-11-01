import React, {useState} from "react";

export default function DisplayNft(props) {
    const [error, setError] = useState(false);

    function mediaError() {
        console.log("error: " + props.media);
        setError(true);
    }

    return (
        <div className="displayNft" style={error ? {"display": "none"} : {"display": "inline-block"}} onClick={() => props.selectNFT()}>
            <div id="nftFlex">
                {props.type === "vid" ?
                    <video className="nftVid"  autoPlay muted loop>
                        <source src={props.media} type="video/mp4" onError={() => mediaError()} />
                    </video> :
                    <img src={props.media} className="nftImage" onError={() => mediaError()}/>
                }
                <div className="texty">
                    {props.name}
                </div>
            </div>
        </div>
    );
}