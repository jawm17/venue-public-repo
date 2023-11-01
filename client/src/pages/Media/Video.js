import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Web3Context } from "../../context/Web3Context";
import moment from "moment";
import HeaderMain from "../../components/HeaderMain";
import VideoPlayer from "./VideoPlayer";
import BuyCard from "../../components/BuyCard";
import CommentSection from "./CommentSection.js"
import * as sendService from "../../services/SendService";
import axios from "axios";
import CommentArea from "../../components/CommentArea";
import tippers from "./topTippers.json";
import TopTipper from "./TopTipper";
import VideoContent from "./VideoContent";
import AuthWindow from "../../components/AuthWindow";
import TipModal from "./TipModal";
import Confetti from "../../components/Confetti";
import UnlockModal from "../../components/UnlockModal";
import PreviewComponent from "../../components/PreviewComponent";
import TopTippers from "../../components/TopTippers";
import MainChart from "../../components/CreatorChart";
import CollectModal from "../../components/CollectModal";

import "./styles/videoStyle.css";
import PaywallModal from "./PaywallModal";
import Footer from "../../components/Footer";
import BottomNavBlock from "../../components/BottomNavBlock";

export default function Video(props) {
    const history = useHistory();
    const { user, balance, getBalance } = useContext(AuthContext);
    const { chainId } = useContext(Web3Context);
    const [authWindow, setAuthWindow] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");
    const [videoData, setVideoData] = useState();
    const [sending, setSending] = useState(false);
    const [liked, setLiked] = useState(false);
    const [creator, setCreator] = useState([]);
    const [selectedTab, setSelectedTab] = useState("comments");
    const [likeCount, setLikeCount] = useState(0);
    const [videoTips, setVideoTips] = useState([]);
    const [videoTxs, setVideoTxs] = useState([]);
    const [solEarned, setSolEarned] = useState(0);
    const [loading, setLoading] = useState(false);
    const [unlockModal, setUnlockModal] = useState(false);
    const [collectingToUnlock, setCollectingToUnlock] = useState(false);
    const [paywallModal, setPaywallModal] = useState(false);
    const [collecting, setCollecting] = useState(false);
    const [accessParameters, setAccessParameters] = useState({ price: 69 });
    const [confetti, setConfetti] = useState(false);
    const [cardWindow, setCardWindow] = useState(false);
    const [refreshChart, setRefreshChart] = useState(0);
    const [relatedContent, setRelatedContent] = useState([]);

    useEffect(() => {
        if (props.match.params.id) {
            setVideoSrc();
            getVideoData();
        }
    }, [props.match.params.id, user]);

    useEffect(() => {
        if (videoSrc && user) {
            updateViewCount();
        }
    }, [videoSrc]);

    useEffect(() => {
        if (user) {
            getBalance();
        }
    }, []);

    async function getVideoData() {
        try {
            const res = await axios.post("/media/get-video-data", { videoID: props.match.params.id, user });
            if (res.data?.video && res.data?.creator) {
                const { video, creator } = res.data;
                setVideoData(video);
                setCreator(creator);
                setLikeCount(video.likes?.length || 0);
                setAccessParameters({ chain: video.chain, accessType: video.accessType, accessToken: video.accessToken, price: video.price });
                getTips(video._id);
                getVideoTxs(video._id);
                genRelatedContent(creator.userID)
                console.log(res.data);

                if (video.videoSrc) {
                    setVideoSrc(video.videoSrc);
                } else {
                    if (video.accessType === "paywall") {
                        checkForPayment(video);
                    } else if (video.accessType === "gate") {
                        // do something ============================================
                        // do something ============================================
                        // do something ============================================
                        // do something ============================================
                        // do something ============================================
                        // do something ============================================
                    }
                }
                if (user) {
                    setLiked(video.likes.find(like => like === user._id.toString()));
                }
            } else {
                history.push("/home");
            }
        } catch (error) {
            console.log(error)
            history.push("/home");
        }
    }

    async function checkNFTOwner() {
        setLoading(true);
        try {
            const data = await axios.post("/media/get-src-gated",
                {
                    videoID: videoData._id,
                    contractAddress: accessParameters.accessToken.contractAddress,
                    chain: accessParameters.chain
                }
            );
            setLoading(false);
            if (data.data.videoSrc) {
                setVideoSrc(data.data.videoSrc);
            } else {
                setUnlockModal(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function checkForPayment(video) {
        if (user) {
            // check for unlock tx from user's address
            let userTxs = video.txs.filter(tx => tx.from.toString() === user._id.toString());
            let unlockTxs = userTxs.filter(tx => tx.type === "unlock");
            let successUnlock = unlockTxs.find(tx => tx.status === "confirmed" || tx.status === "pending");
            if (successUnlock) {
                checkTxStatus(successUnlock.hash, video._id);
            }
        }
    }

    async function checkTxStatus(txID, videoID) {
        const data = await sendService.checkPending(txID, videoID);
        if (data.status === "pending") {
            setTimeout(() => { checkTxStatus(txID, videoID) }, 2000);
        } else if (data.status === "success") {
            setRefreshChart((refreshChart) => refreshChart + 1);
            setVideoSrc(data.videoSrc);
        }
    }

    async function getTips(id) {
        try {
            const data = await axios.post('/tx/get-tips', { videoID: id });
            console.log(data)
            setVideoTips([]);
            if (data.data?.txs) {
                setVideoTips(data.data.txs.slice(0, 5))
            }
        } catch (error) {

        }
    }

    async function getVideoTxs(id) {
        try {
            const data = await axios.post('/tx/get-video-txs', { videoID: id });
            console.log(data)
            if (data.data?.txs) {
                let count = 0;
                setVideoTxs(data.data.txs);
                data.data.txs.forEach(tx => {
                    if (tx.type === "unlock") {
                        count = count + tx.amount;
                    }
                });
                setSolEarned(count);
            }
        } catch (error) {

        }
    }

    async function genRelatedContent(creatorID) {
        try {
            // get creator's other videos
            const creatorContent = await axios.post("/media/creator-videos", { creatorID });
            let contentArray = creatorContent.data.document.filter(video => video._id !== props.match.params.id).slice(0, 6);

            // get recent videos
            const newContent = await axios.get("/media/get-recent-videos");
            const filteredVideos = newContent.data.recentVideos.filter(video => video.user._id !== creatorID).slice(0, 12);

            // combine video arrays
            contentArray = contentArray.concat(filteredVideos);
            setRelatedContent(contentArray);
        } catch (error) {

        }
    }

    async function createLike() {
        if (user) {
            setLiked(!liked);
            if (liked) {
                setLikeCount(likeCount - 1)
            } else {
                setLikeCount(likeCount + 1)
            }
            try {
                await axios.post("/media/like", { videoId: props.match.params.id, });
            } catch (error) {
                console.log(error);
            }
        } else {
            setAuthWindow(true);
        }
    }

    async function updateViewCount() {
        try {
            await axios.post("/media/new-view", { videoID: props.match.params.id, userID: user._id });
        } catch (error) {
            console.log(error);
        }
    }

    function closePaywallModal() {
        setPaywallModal(false);
        setLoading(false);
    }

    async function unlockVideo() {
        if (user) {
            if (balance < videoData.price) {
                setCardWindow(true);
            } else {
                setPaywallModal(true);
            }
        } else {
            setAuthWindow(true);
        }
    }

    function collectUser(unlocking) {
        if (user) {
            if (unlocking) {
                setCollectingToUnlock(true);
            } else {
                setCollectingToUnlock(false);
            }
            setCollecting(true);
        } else {
            setAuthWindow(true);
        }
    }

    function closePaywallBuyCard() {
        setPaywallModal(false);
        setSending(false);
        setCardWindow(true);
        setLoading(false);
    }

    function closeTipModal() {
        setSending(false)
    }

    function purchaseDone() {
        setCardWindow(false);
        console.log("hitting")
        setTimeout(() => {
            // getCardBalances(user.address);
        }, 3300);
    }

    function sentTip() {
        setRefreshChart((refreshChart) => refreshChart + 1);
        getTips(videoData._id);
        getVideoTxs(videoData._id);
    }

    function doItToIt() {
        setRefreshChart((refreshChart) => refreshChart + 1);
    }

    function sendTip() {
        if (user) {
            setSending(true)
        } else {
            setAuthWindow(true);
        }
    }

    return (
        <div>
            <HeaderMain />
            {collecting ? <CollectModal unlocking={collectingToUnlock} user={creator} close={() => setCollecting(false)} /> : null}
            {unlockModal ? <UnlockModal close={() => setUnlockModal(false)} checkWallet={() => checkNFTOwner()} accessParams={accessParameters} link={videoData.tokenLink} /> : null}
            {paywallModal ? <PaywallModal buyCard={() => closePaywallBuyCard()} done={videoSrc} creator={creator} videoData={videoData} setConfetti={() => setConfetti(true)} close={() => closePaywallModal()} checkTxStatus={(hash) => checkTxStatus(hash, videoData._id)} /> : null}
            {false ? <Confetti element="playerContainer" /> : null}
            {authWindow ? <AuthWindow cancel={() => setAuthWindow(false)} /> : null}
            {cardWindow ? <BuyCard cancel={() => setCardWindow(false)} purchaseDone={() => purchaseDone()} /> : null}
            {sending && videoData ?
                <TipModal
                    sentTip={() => sentTip()}
                    username={creator.username}
                    userID={creator.userID}
                    userAddress={creator.userAddress}
                    videoData={videoData}
                    buyCard={() => closePaywallBuyCard()}
                    close={() => closeTipModal()}
                />
                : null}

            <div id="videoPage">
                <div id="innerContent">

                    <div id="playerContainer">
                        {videoSrc ?
                            <VideoPlayer src={videoSrc} />
                            :
                            <div id="paywallSpace">
                                {videoData?.thumbSrc ? <img id="videoThumbBlurred" src={videoData.thumbSrc}></img> : null}
                                <div id="paywallMsg">

                                    <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 11.75C5.75 11.1977 6.19772 10.75 6.75 10.75H17.25C17.8023 10.75 18.25 11.1977 18.25 11.75V17.25C18.25 18.3546 17.3546 19.25 16.25 19.25H7.75C6.64543 19.25 5.75 18.3546 5.75 17.25V11.75Z"></path>
                                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 10.5V10.3427C7.75 8.78147 7.65607 7.04125 8.74646 5.9239C9.36829 5.2867 10.3745 4.75 12 4.75C13.6255 4.75 14.6317 5.2867 15.2535 5.9239C16.3439 7.04125 16.25 8.78147 16.25 10.3427V10.5"></path>
                                    </svg>
                                    <div id="paywallText">
                                        {accessParameters?.accessType === "gate" ? "collect " + creator?.username + " to unlock this video" : "This video costs $" + accessParameters.price + " to unlock"}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div id="videoRow1">
                        <div id="videoInfo">
                            <div id="videoTitle">
                                {videoData?.title || "VIDEO TITLE"}
                            </div>
                        </div>
                        <div id="videoStats">

                            <div className="videoStat" id="likeBtn" onClick={() => createLike()}>
                                <svg id="likeIcon" width="19.2" height="19.2" fill={liked ? "red" : "none"} viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" stroke={liked ? "red" : "white"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z" clip-rule="evenodd"></path>
                                </svg>
                                <div id="viewNum">
                                    {likeCount}
                                </div>
                            </div>
                            <div className="videoStat">
                                <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 12C19.25 13 17.5 18.25 12 18.25C6.5 18.25 4.75 13 4.75 12C4.75 11 6.5 5.75 12 5.75C17.5 5.75 19.25 11 19.25 12Z"></path>
                                    <circle cx="12" cy="12" r="2.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                                </svg>
                                <div id="viewNum">
                                    {videoData?.viewHistory?.length || 0}
                                </div>
                            </div>
                            <div className="videoStat">
                                <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="7.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 8.75H11.375C10.4775 8.75 9.75 9.47754 9.75 10.375V10.375C9.75 11.2725 10.4775 12 11.375 12H12.625C13.5225 12 14.25 12.7275 14.25 13.625V13.625C14.25 14.5225 13.5225 15.25 12.625 15.25H9.75" />
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7.75V8.25" />
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15.75V16.25" />
                                </svg>
                                <div id="viewNum">
                                    {videoData ? (Math.round(videoData?.solEarned * 100000) / 100000).toFixed(5).replace(/\.?0+$/, '') : "0.00"}
                                </div>
                            </div>
                        </div>
                        <div id="tipUnlockBtnArea">
                            {/* <div id="likeBtn" onClick={() => createLike()}>
                                like
                            </div> */}
                            {videoSrc ?
                                <div id="tipBtn" onClick={() => sendTip()}>
                                    <div className="unlockIconFlex">
                                        <svg className="unlockBtnIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="7.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 8.75H11.375C10.4775 8.75 9.75 9.47754 9.75 10.375V10.375C9.75 11.2725 10.4775 12 11.375 12H12.625C13.5225 12 14.25 12.7275 14.25 13.625V13.625C14.25 14.5225 13.5225 15.25 12.625 15.25H9.75"></path>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7.75V8.25"></path>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15.75V16.25"></path>
                                        </svg>

                                        <div className="btnText">
                                            send tip
                                        </div>
                                    </div>
                                </div>
                                :
                                <div id="tipBtn" onClick={accessParameters?.accessType === "gate" ? () => collectUser(true) : () => unlockVideo()}>
                                    {loading ?
                                        <div id="loaderFlex">
                                            <div className="loaderAuth">
                                            </div>
                                        </div>
                                        :
                                        <div className="unlockIconFlex">
                                            <svg className="unlockBtnIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 11.75C5.75 11.1977 6.19772 10.75 6.75 10.75H17.25C17.8023 10.75 18.25 11.1977 18.25 11.75V17.25C18.25 18.3546 17.3546 19.25 16.25 19.25H7.75C6.64543 19.25 5.75 18.3546 5.75 17.25V11.75Z"></path>
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 10.5V10.3427C7.75 8.78147 7.65607 7.04125 8.74646 5.9239C9.36829 5.2867 10.3745 4.75 12 4.75C13.6255 4.75 14.6317 5.2867 15.2535 5.9239C16.3439 7.04125 16.25 8.78147 16.25 10.3427V10.5"></path>
                                            </svg>
                                            <div className="btnText">
                                                unlock
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div id="videoUser">
                        <div id="videoUserFlex">
                            <img onClick={() => history.push("/user/" + creator?.username)} id="videoUserPic" src={creator?.profileImg}></img>
                            <div>
                                <div onClick={() => history.push("/user/" + creator?.username)} id="videoUsername">
                                    {creator?.username || "USER"}
                                </div>
                                <div id="videoUserCollectorCount">
                                    6 collectors
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="videoDescription">
                        {videoData?.description}
                    </div>
                    <div id="videoCreatedAt">
                        {moment(videoData?.createdAt).format("LLL")}
                    </div>

                    {videoTips.length > 0 ?
                        <TopTippers supporters={videoTips} />
                        :
                        null
                    }

                    <div id="videoTabsFlex">
                        <div id="videoTabs">
                            <div id="videoTabBtns">
                                <div onClick={() => setSelectedTab("comments")} className={selectedTab === "comments" ? "selectedVideoTab" : "videoTab"} id="videosTab">
                                    comments
                                </div>
                                <div onClick={() => setSelectedTab("activity")} className={selectedTab === "activity" ? "selectedVideoTab" : "videoTab"} id="videosTab">
                                    activity
                                </div>
                                <div onClick={() => setSelectedTab("related")} className={selectedTab === "related" ? "selectedVideoTab" : "videoTab"} id="relatedContentTab">
                                    related
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="videoContentFlex">
                        <div id="videoContentArea">
                            {videoData ?
                                <VideoContent unlocked={videoSrc ? true : false} videoData={videoData} relatedContent={relatedContent} selectedTab={selectedTab} txs={videoTxs} />
                                :
                                <div>
                                    loading
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div id="rightVideoContent">
                    <div id="creatorStatsTitle">
                        Creator Earnings
                    </div>
                    <div id="creatorStats">
                        <MainChart platform={"uniswap"} creatorId={creator?.userID} refreshChart={refreshChart} />
                        <div id="creatorStatsRow">
                            <img id="creatorStatsImg" src={creator?.profileImg} onClick={() => history.push("/user/" + creator?.username)}></img>
                            <div id="creatorStatsName" onClick={() => history.push("/user/" + creator?.username)}>
                                {creator?.username}
                            </div>
                            <div id="statsCollect" onClick={() => collectUser(false)}>
                                collect
                            </div>
                        </div>

                        <div id="chartOuter"><canvas id="myChart"></canvas></div>
                    </div>
                    <div id="relatedVideosTitle">
                        Related Videos
                    </div>
                    <div className="relatedVideoGrid">
                        {relatedContent.map((video, index) => {
                            return (
                                <PreviewComponent
                                    type={props.type}
                                    index={index}
                                    key={video._id + props.type}
                                    videoID={video._id}
                                    price={video.price}
                                    thumb={video.thumbSrc}
                                    title={video.title}
                                    views={video.viewHistory?.length}
                                    solEarned={video.solEarned}
                                    username={video.user?.username || video.name}
                                    userPic={video.user?.profileImg || video.profileImg}
                                    grid={true}
                                />
                            )
                        })}
                    </div>
                </div>
                <div id="relatedVideoFade">

                </div>
            </div>
            <BottomNavBlock />
        </div>
    );
}