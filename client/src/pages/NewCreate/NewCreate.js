import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import HeaderMain from "../../components/HeaderMain";
import NFTSelector from "./NFTSelector";
import PaywallOptions from "./PaywallOptions";
import VideoUploadHandler from "./VideoUploadHandler";
import ThumbnailUploadHandler from "./ThumbnailUploadHandler";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./styles/newCreateStyle.css";
import BottomNavBlock from "../../components/BottomNavBlock";

export default function NewCreate() {
    const history = useHistory();
    const { isAuthenticated, setIsAuthenticated, user } = useContext(AuthContext);
    const [accessType, setAccessType] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbUrl, setThumbUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [accessToken, setAccessToken] = useState({});
    const [tokenLink, setTokenLink] = useState("");
    const [paywallChain, setPaywallChain] = useState("mainnet");
    const [gateChain, setGateChain] = useState("mainnet");

    const [loading, setLoading] = useState("");

    function scrollTo(id) {
        setTimeout(() => {
            document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        }, 400);
    }

    useEffect(() => {
        if (accessType) {
            scrollTo(accessType + "Access");
        }
    }, [accessType]);


    async function submitPost() {
        if (!loading) {
            // check for all video fields complete and if accesstype data is complete
            if (videoUrl && thumbUrl && title && description && ((accessType === "paywall" && price > 0) || accessType === "gate" || accessType === "all" || accessType === "collectors")) {
                setLoading("true");
                let chain = "";
                if (accessType === "paywall") {
                    chain = paywallChain;
                } else if (accessType === "gate") {
                    chain = gateChain;
                }

                // get timestamp data
                let duration = document.getElementById("uploadPlayer").duration;
                var hours = Math.floor(duration / 3600);
                var minutes = Math.floor((duration - (hours * 3600)) / 60);
                var seconds = Math.floor(duration - (hours * 3600) - (minutes * 60));
                var timestamp = '';
                if (hours > 0) {
                    timestamp += ('0' + hours).slice(-2) + ':';
                }
                timestamp += ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);

                let newVideo = { user, userID: user._id, videoSrc: videoUrl, thumbSrc: thumbUrl, title, description, accessType, accessToken, price, chain, tokenLink, timestamp }
                try {
                    const data = await axios.post("/media/new-video", { newVideo });
                    console.log(data.data);
                    setTimeout(() => {
                        setLoading("done");
                        setTimeout(() => {
                            history.push("/account");
                        }, 800);
                    }, 500);
                } catch (error) {
                    setLoading("");
                    setIsAuthenticated(false);
                    history.push("/");
                }
            } else {
                alert("missing data");
            }
        }
    }

    return (
        <div>
            <HeaderMain />
            <div id="loadingBlank">

            </div>
            <div id="createFlex">
                <div id="creationSpace">
                    <div id="createTitle">
                        CREATE
                    </div>

                    <div className="createInputLabel">
                        Video Title
                    </div>
                    <div className="createInputArea">
                        <div className="maxTitleCount">
                            {title.length}/70
                        </div>
                        <input className="createInput" value={title} maxlength={70} onChange={(e) => setTitle(e.target.value)}></input>
                    </div>

                    <div id="uploadArea">
                        <VideoUploadHandler setVid={(url) => setVideoUrl(url)} />
                    </div>
                    <div id="uploadOptionsFlex">
                        <div id="uploadCreationDate">
                            <div>
                                Created
                            </div>
                            <div id="uploadDate">
                                {moment(Date.now()).format("ll")}
                            </div>
                        </div>
                    </div>


                    <div className="createThumbLabel">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 16L7.49619 12.5067C8.2749 11.5161 9.76453 11.4837 10.5856 12.4395L13 15.25M10.915 12.823C11.9522 11.5037 13.3973 9.63455 13.4914 9.51294C13.4947 9.50859 13.4979 9.50448 13.5013 9.50017C14.2815 8.51598 15.7663 8.48581 16.5856 9.43947L19 12.25M6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V6.75C19.25 5.64543 18.3546 4.75 17.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25Z"></path>
                        </svg>
                        <div className="thumbLabelText">
                            Thumbnail
                        </div>
                    </div>
                    <div className="thumbLabelSub">
                        Choose the thumbnail that is displayed before the video plays
                    </div>
                    <div id="thumbnailSelector">
                        <div id="thumbnailGroup">
                            <ThumbnailUploadHandler setThumb={(url) => setThumbUrl(url)} />
                        </div>
                    </div>



                    <div className="createThumbLabel">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 16L7.49619 12.5067C8.2749 11.5161 9.76453 11.4837 10.5856 12.4395L13 15.25M10.915 12.823C11.9522 11.5037 13.3973 9.63455 13.4914 9.51294C13.4947 9.50859 13.4979 9.50448 13.5013 9.50017C14.2815 8.51598 15.7663 8.48581 16.5856 9.43947L19 12.25M6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V6.75C19.25 5.64543 18.3546 4.75 17.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25Z"></path>
                        </svg>
                        <div className="thumbLabelText">
                            Description
                        </div>
                    </div>
                    <div className="thumbLabelSub">
                        Add a brief description about your video
                    </div>
                    <div id="descriptionInputArea">
                        <div id="maxDescriptionCount">
                            {description.length}/240
                        </div>
                        <textarea id="descriptionInput" value={description} maxlength={240} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>



                    <div>
                        <div className="createThumbLabel">
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 11.75C5.75 11.1977 6.19772 10.75 6.75 10.75H17.25C17.8023 10.75 18.25 11.1977 18.25 11.75V17.25C18.25 18.3546 17.3546 19.25 16.25 19.25H7.75C6.64543 19.25 5.75 18.3546 5.75 17.25V11.75Z"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 10.5V10.3427C7.75 8.78147 7.65607 7.04125 8.74646 5.9239C9.36829 5.2867 10.3745 4.75 12 4.75C13.6255 4.75 14.6317 5.2867 15.2535 5.9239C16.3439 7.04125 16.25 8.78147 16.25 10.3427V10.5"></path>
                            </svg>
                            <div className="thumbLabelText">
                                Access
                            </div>
                        </div>
                        <div className="thumbLabelSub">
                            Select who has access to your video
                        </div>
                        <div id="accessOptionArea">
                            <div className="accessOption" id={accessType === "all" ? "selectedAccess" : ""} style={accessType === "all" ? { border: "solid 1px var(--green)" } : null}>
                                <div className="accessOptionTop">
                                    <div className="iconBg">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.78168 19.25H13.2183C13.7828 19.25 14.227 18.7817 14.1145 18.2285C13.804 16.7012 12.7897 14 9.5 14C6.21031 14 5.19605 16.7012 4.88549 18.2285C4.773 18.7817 5.21718 19.25 5.78168 19.25Z"></path>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 14C17.8288 14 18.6802 16.1479 19.0239 17.696C19.2095 18.532 18.5333 19.25 17.6769 19.25H16.75"></path>
                                            <circle cx="9.5" cy="7.5" r="2.75" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.75 10.25C16.2688 10.25 17.25 9.01878 17.25 7.5C17.25 5.98122 16.2688 4.75 14.75 4.75"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        everyone
                                    </div>
                                    <div onClick={() => setAccessType("all")} className="accessSelectBtn" id="allAccess">
                                        {accessType === "all" ? "selected" : "select"}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="accessOption" id={accessType === "gate" ? "selectedAccess" : ""} style={accessType === "gate" ? { border: "solid 1px var(--green)" } : null}>
                                <div className="accessOptionTop">
                                    <div className="iconBg">
                                        <svg className="profileMenuBtnIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13.25C17.3472 13.25 19.25 11.3472 19.25 9C19.25 6.65279 17.3472 4.75 15 4.75C12.6528 4.75 10.75 6.65279 10.75 9C10.75 9.31012 10.7832 9.61248 10.8463 9.90372L4.75 16V19.25H8L8.75 18.5V16.75H10.5L11.75 15.5V13.75H13.5L14.0963 13.1537C14.3875 13.2168 14.6899 13.25 15 13.25Z"></path>
                                            <path stroke="currentColor" d="M16.5 8C16.5 8.27614 16.2761 8.5 16 8.5C15.7239 8.5 15.5 8.27614 15.5 8C15.5 7.72386 15.7239 7.5 16 7.5C16.2761 7.5 16.5 7.72386 16.5 8Z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        collectors
                                    </div>
                                    <div onClick={() => setAccessType("gate")} className="accessSelectBtn" id="gateAccess">
                                        {accessType === "gate" ? "selected" : "select"}
                                    </div>
                                </div>
                            </div> */}
                            <div className="accessOption" id={accessType === "paywall" ? "selectedAccess" : ""} style={accessType === "paywall" ? { border: "solid 1px var(--green)", height: "180px" } : null}>
                                <div className="accessOptionTop">
                                    <div className="iconBg">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 8.25V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75"></path>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5 13C16.5 13.2761 16.2761 13.5 16 13.5C15.7239 13.5 15.5 13.2761 15.5 13C15.5 12.7239 15.7239 12.5 16 12.5C16.2761 12.5 16.5 12.7239 16.5 13Z"></path>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25H6.5C5.5335 8.25 4.75 7.4665 4.75 6.5C4.75 5.5335 5.5335 4.75 6.5 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V8.25ZM17.25 8.25H19.25"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        paywall
                                    </div>
                                    <div onClick={() => setAccessType("paywall")} className="accessSelectBtn" id="paywallAccess">
                                        {accessType === "paywall" ? "selected" : "select"}
                                    </div>
                                </div>
                                <div id="accessOptionPaywall">
                                    <PaywallOptions setChain={(chain) => setPaywallChain(chain)} setAmount={(amount) => setPrice(amount)} style={accessType === "paywall" ? { display: "initial" } : { display: "none" }} />
                                </div>
                            </div>
                            {/* <div className="accessOption" id={accessType === "gate" ? "selectedAccessGate" : ""}>
                                <div className="accessOptionTop">
                                    <div className="iconBg">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 5.75C4.75 5.19772 5.19772 4.75 5.75 4.75H9.25C9.80228 4.75 10.25 5.19772 10.25 5.75V9.25C10.25 9.80228 9.80228 10.25 9.25 10.25H5.75C5.19772 10.25 4.75 9.80228 4.75 9.25V5.75Z"></path>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 14.75C4.75 14.1977 5.19772 13.75 5.75 13.75H9.25C9.80228 13.75 10.25 14.1977 10.25 14.75V18.25C10.25 18.8023 9.80228 19.25 9.25 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V14.75Z"></path>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.75 5.75C13.75 5.19772 14.1977 4.75 14.75 4.75H18.25C18.8023 4.75 19.25 5.19772 19.25 5.75V9.25C19.25 9.80228 18.8023 10.25 18.25 10.25H14.75C14.1977 10.25 13.75 9.80228 13.75 9.25V5.75Z"></path>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.75 14.75C13.75 14.1977 14.1977 13.75 14.75 13.75H18.25C18.8023 13.75 19.25 14.1977 19.25 14.75V18.25C19.25 18.8023 18.8023 19.25 18.25 19.25H14.75C14.1977 19.25 13.75 18.8023 13.75 18.25V14.75Z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        token gate
                                    </div>
                                    <div onClick={() => setAccessType("gate")} className="accessSelectBtn" id="gateAccess">
                                        {accessType === "gate" ? "selected" : "select"}
                                    </div>
                                </div>
                                <div id="gateDetails" >
                                    <NFTSelector setChain={(chain) => setGateChain(chain)} selectLink={(link) => setTokenLink(link)} setToken={(nft) => setAccessToken(nft)} />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <div id="missingDataMsg">
                        * missing data
                    </div> */}
                    <div id="submitVideoBtn" onClick={() => submitPost()}>
                        {loading ? loading === "done" ?
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"></path>
                            </svg>
                            :
                            <div className="loaderFlex3">
                                <div className="loader3">
                                </div>
                            </div>
                            :
                            <div>
                                publish video
                            </div>
                        }
                    </div>
                </div>
            </div>
            <BottomNavBlock />
        </div >
    );
}