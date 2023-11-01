import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderMain from "../../components/HeaderMain";
import Footer from "../../components/Footer";
import AuthWindow from "../../components/AuthWindow";
import TopUser from "./TopUser";
import videoSeed from "./topvideos.json";
import users from "./topusers.json";
import VideoRow from "./VideoRow";
import popularVideos from "./popularvideos.json";
import VideoRowPlaceHolder from "./VideoRowPlaceHolder";
import UserRowPlaceHolder from "./UserRowPlaceHolder";
import BottomNav from "../../components/BottomNav";
import "./styles/homeStyle.css";
import BottomNavBlock from "../../components/BottomNavBlock";

export default function Home(props) {
    const [topUsers, setTopUsers] = useState([]);
    const [topEarningVideos, setTopEarningVideos] = useState([]);
    const [recentVideos, setRecentVideos] = useState([]);
    const [mostViewedVideos, setMostViewedVideos] = useState([]);
    const [authWindow, setAuthWindow] = useState(false);
    const [googleAuth, setGoogleAuth] = useState(false);

    useEffect(() => {
        getTopUsers();
        getTopVideos();
        // setTimeout(() => {
        //     document.documentElement.style.setProperty('--green', '#0B83FF');
        // }, 2000);

        // window.addEventListener("resize", handleResize);
        // return () => window.removeEventListener("resize", handleResize);
    }, []);


    function startTicker() {
        const ticker = document.getElementById('stock-ticker');
        const items = ticker.getElementsByClassName('ticker-item');
        let currentItem = 0;

        function moveTicker() {
            // Calculate the width of the current item
            const currentWidth = items[currentItem].offsetWidth;
            // Move the ticker to the left
            ticker.style.transform = `translateX(-${currentWidth}px)`;
            // Increment the current item counter
            currentItem++;
            // Reset the counter to zero if it exceeds the number of items
            if (currentItem >= items.length) {
                currentItem = 0;
            }
        }

        // Move the ticker every 3 seconds
        setInterval(moveTicker, 3000);
    }

    async function getTopUsers() {
        try {
            const topUserData = await axios.get("/media/get-top-users");

            setTopUsers(topUserData.data.topEarningUsers);
        } catch (error) {

        }
    }

    async function getTopVideos() {
        try {
            const topEarningVideoData = await axios.get("/media/get-earning-videos");
            setTopEarningVideos(topEarningVideoData.data.topEarningVideos.slice(0, 30));
            const topViewData = await axios.get("/media/get-top-videos-views");
            setMostViewedVideos(topViewData.data.mostViewedVideos.slice(0, 30));
            const recentVideoData = await axios.get("/media/get-recent-videos");
            setRecentVideos(recentVideoData.data.recentVideos.slice(0, 30));
        } catch (error) {

        }
    }

    let numShown = 2;
    function showMoreUsers() {
        // let currentLength = topVideos.length;
        // setTopVideos(topVideos => topVideos.concat([...topVideosTotal.slice(currentLength, currentLength + 3)]));
        numShown += 3; // increase the number of shown components by 3
        const components = document.querySelectorAll('.topUserDiv');
        // show/hide components based on the number shown
        for (let i = 0; i < numShown; i++) {
            if (i < components.length) {
                if (i < numShown) {
                    components[i].style.display = 'block';
                } else {
                    components[i].style.display = 'none';
                }
            }
        }
    }

    return (
        <div>
            <HeaderMain googleAuth={googleAuth} />
            {/* <div id="stock-ticker-container">
                <div id="stock-ticker">
                    <div class="ticker-item">AAPL: $144.50</div>
                    <div class="ticker-item">GOOG: $2,256.64</div>
                    <div class="ticker-item">TSLA: $739.78</div>
                    <div class="ticker-item">AMZN: $3,350.50</div>
                    <div class="ticker-item">MSFT: $261.15</div>
                </div>
            </div> */}
            <div id="homePager">
                <div id="topUserFlex">
                    <div id="topUsersTitle">
                        Top Earning Creators
                    </div>
                    <div id="topUsersRow">
                        {topUsers.map((user, index) => {
                            return (
                                <TopUser
                                    index={index}
                                    key={index}
                                    username={user.username}
                                    amount={user.solEarned}
                                    profileImg={user.profileImg}
                                />
                            )
                        })}
                    </div>

                </div>
                <div id="showMoreUsersBtn" onClick={() => showMoreUsers()}>
                    <div className="showMoreLine">

                    </div>
                    <div id="showMoreIconCircle">
                        <svg xmlns="https://www.w3.org/2000/svg" id="showMoreIcon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>

                    <div className="showMoreLine">

                    </div>
                </div>
                {/* {topUsers.length > 0 ?
                <div id="topUserFlex">
                    <div id="topUsersTitle">
                        Top Earning Creators
                    </div>
                    <div id="topUsersRow">
                        {topUsers.map((user, index) => {
                            return (
                                <TopUser
                                    index={index}
                                    key={index}
                                    username={user.name}
                                    amount={user.solEarned}
                                    profileImg={user.profilePic}
                                />
                            )
                        })}
                    </div>
                    <div className="showMoreBtn" onClick={() => showMoreUsers()}>
                        <div className="showMoreLine">

                        </div>
                        <div>
                            show more
                        </div>
                        <div className="showMoreLine">

                        </div>
                    </div>
                </div>
                :
                <UserRowPlaceHolder />
                } */}
                <div id="homeRows">
                    {topEarningVideos.length > 0 ? <VideoRow title={"Top Earning Videos"} type="earning" content={topEarningVideos} /> : <VideoRowPlaceHolder />}
                    {mostViewedVideos.length > 0 ? <VideoRow title={"Popular Videos"} type="popular" content={mostViewedVideos} /> : <VideoRowPlaceHolder />}
                    {recentVideos.length > 0 ? <VideoRow title={"New Videos"} type="trending" content={recentVideos} /> : <VideoRowPlaceHolder />}
                </div>
                <div id="homeSpacer">
                </div>
                <Footer />
                <BottomNavBlock />
            </div>
        </div>
    );
}