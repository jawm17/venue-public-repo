import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import HeaderMain from "../../components/HeaderMain";
import ProfileContent from "./ProfileContent";
import TopSupporters from "../../components/TopSupporters";
import CollectModal from "../../components/CollectModal";
import "./styles/profileStyle.css";
import BottomNavBlock from "../../components/BottomNavBlock";

export default function Profile(props) {
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const [selectedTab, setSelectedTab] = useState("videos");
    const [totalBalance, setTotalBalance] = useState(0);
    const [loadingContent, setLoadingContent] = useState(false);
    const [collection, setCollection] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [cards, setCards] = useState([{}, { tokenId: '0', balance: '95' }]);
    const [collecting, setCollecting] = useState(false);
    const [userData, setUserData] = useState({});
    const [videos, setVideos] = useState([]);
    const [unlockedMedia, setUnlockedMedia] = useState([]);
    const [likedMedia, setLikedMedia] = useState([]);

    const [supporters, setSupporters] = useState([]);

    useEffect(() => {
        if (props.match.params.user) {
            getUserInfo();
        } else {
            history.push("/home");
        }
    }, [props.match.params.user]);

    useEffect(() => {
        if (userData._id) {
            getWalletContent();
        }
    }, [userData]);

    async function getUserInfo() {
        setLoadingContent(true);
        try {
            const res = await axios.post("/user/profile-content", { username: props.match.params.user });
            console.log(res);
            setVideos(res.data.user.videos.reverse());
            setUserData(res.data.user);
            setLoadingContent(false);
        } catch (err) {
            console.log(err);
        }
    }

    async function getWalletContent() {
        try {
            const { data } = await axios.post("/tx/get-all-txs", { userID: userData._id });
            console.log(data.txs)
            setTransactions(data.txs.reverse());
            getTopSupporters(data.txs);
        } catch (error) {
            console.log(error);
        }
    }

    function getTopSupporters(transactions) {
        const userMap = new Map();

        const filteredArray = transactions.filter(tx => tx.fromAddress.toUpperCase() != userData.address.toUpperCase());

        // loop through each user object and aggregate their payment amount
        filteredArray.forEach(tx => {
            const { from, amount } = tx;
            const { address } = from;
            const currentAmount = userMap.get(address) || 0;
            userMap.set(address, currentAmount + amount);
        });

        // convert the userMap to an array and sort it by payment amount in descending order
        const sortedUsers = Array.from(userMap, ([address, amount]) => {
            const { from } = transactions.find(tx => tx.fromAddress.toUpperCase() === address.toUpperCase());
            const { profileImg, username } = from;
            return { address, amount, profileImg, username };
        }).sort((a, b) => b.amount - a.amount);

        // create a new array of just the user names, taking the first 5
        const topUsers = sortedUsers.slice(0, 5);

        setSupporters(topUsers);
    }

    return (
        <div>
            <HeaderMain />
            {collecting ? <CollectModal user={userData} close={() => setCollecting(false)} /> : null}
            <div id="walletFlex">
                <div id="walletArea">
                    <div id="userHeroArea">
                        {/* <div id="mEthEarned">
                            ${userData?.solEarned?.toFixed(2)} earned
                        </div>
                        <div id="mLastActive">
                            0 collectors
                        </div> */}
                        <img id="walletUserImg" src={userData?.profileImg}></img>
                        {userData?.heroImg ? <img id="walletUserHero" src={userData?.heroImg}></img> : null}
                    </div>
                    <div id="walletUserInfoRow">
                        <div id="walletNameCollect">
                            <div id="walletNameAdress">
                                <div id="walletUserName">{userData?.username}</div>
                                {/* <div id="walletPageAddress">{userData?.address?.substring(0, 8) + "..." + userData?.address?.substring(userData?.address?.length - 5, userData?.address?.length)}</div> */}
                            </div>
                            <div>
                                <div id="sendCollectBtns">
                                    {/* <div id="sendBtn">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z"></path>
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15.5V12.75"></path>
                                        </svg>
                                    </div> */}
                                    <div id="collectBtn" onClick={() => setCollecting(true)}>
                                        collect
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="walletStatsArea">
                            <div id="walletStatsInner">
                                <div className="walletStat">
                                    <div id="walletEarnedAmount">
                                        0
                                    </div>
                                    <div id="walletEarnedLabel">
                                        collectors
                                    </div>
                                </div>
                                <div className="walletStat">
                                    <div id="walletEarnedAmount">
                                        0
                                    </div>
                                    <div id="walletEarnedLabel">
                                        collected
                                    </div>
                                </div>
                                <div className="walletStat">
                                    <div id="walletEarnedAmount">
                                        ${(Math.round(userData?.solEarned * 100000) / 100000).toFixed(2).replace(/\.?0+$/, '') || 0}
                                    </div>
                                    <div id="walletEarnedLabel">
                                        earned
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {userData.bio ?
                        <div id="leftStuff">
                            <div id="userBio">
                                {userData?.bio}
                            </div>
                        </div>
                        :
                        null}

                    {supporters.length > 0 ?
                        <div id="supportersFlex">
                            <TopSupporters supporters={supporters} />
                        </div>
                        :
                        null
                    }
                    <div id="smallStats">
                        <div>
                         ${userData?.solEarned?.toFixed(2)} earned
                        </div>
                        <div id="smallStatsBreak">
                            ●
                        </div>
                        <div>
                            0 collectors
                        </div>
                    </div>

                    <div id="walletMenuProfile">
                        <div id="walletMenuProfileTabs">
                            <div onClick={() => setSelectedTab("videos")} className={selectedTab === "videos" ? "selectedWalletTab" : "walletMenuTab"}>
                                videos
                            </div>
                            <div onClick={() => setSelectedTab("transactions")} className={selectedTab === "transactions" ? "selectedWalletTab" : "walletMenuTab"}>
                                transactions
                            </div>
                            <div onClick={() => setSelectedTab("collection")} className={selectedTab === "collection" ? "selectedWalletTab" : "walletMenuTab"}>
                                collection
                            </div>
                        </div>
                    </div>


                    <div id="profileMenuBtns">
                        <div className="profileMenuBtn" id={selectedTab === "videos" ? "selectedMenuBtn" : null} onClick={() => setSelectedTab("videos")}>
                            <svg className="profileMenuBtnIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.75 5V19"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.25 5V19"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8.75H7.5"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8.75H19"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12H19"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 15.25H7.5"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 15.25H19"></path>
                            </svg>
                            <div>
                                media
                            </div>
                        </div>
                        <div className="profileMenuBtn" id={selectedTab === "collectors" ? "selectedMenuBtn" : null} onClick={() => setSelectedTab("collectors")}>

                            <svg className="profileMenuBtnIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 11.25L10.25 5.75"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 19.2502H6.25C6.80229 19.2502 7.25 18.8025 7.25 18.2502V15.75C7.25 15.1977 6.80229 14.75 6.25 14.75H5.75C5.19772 14.75 4.75 15.1977 4.75 15.75V18.2502C4.75 18.8025 5.19772 19.2502 5.75 19.2502Z"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.75 19.2502H12.25C12.8023 19.2502 13.25 18.8025 13.25 18.2502V12.75C13.25 12.1977 12.8023 11.75 12.25 11.75H11.75C11.1977 11.75 10.75 12.1977 10.75 12.75V18.2502C10.75 18.8025 11.1977 19.2502 11.75 19.2502Z"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.75 19.2502H18.25C18.8023 19.2502 19.25 18.8025 19.25 18.2502V5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H17.75C17.1977 4.75 16.75 5.19772 16.75 5.75V18.2502C16.75 18.8025 17.1977 19.2502 17.75 19.2502Z"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.25 8.25V4.75H7.75"></path>
                            </svg>

                            <div>
                                stats
                            </div>
                        </div>
                        <div className="profileMenuBtn" id={selectedTab === "collection" ? "selectedMenuBtn" : null} onClick={() => setSelectedTab("collection")}>
                            <svg className="profileMenuBtnIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13.25C17.3472 13.25 19.25 11.3472 19.25 9C19.25 6.65279 17.3472 4.75 15 4.75C12.6528 4.75 10.75 6.65279 10.75 9C10.75 9.31012 10.7832 9.61248 10.8463 9.90372L4.75 16V19.25H8L8.75 18.5V16.75H10.5L11.75 15.5V13.75H13.5L14.0963 13.1537C14.3875 13.2168 14.6899 13.25 15 13.25Z"></path>
                                <path stroke="currentColor" d="M16.5 8C16.5 8.27614 16.2761 8.5 16 8.5C15.7239 8.5 15.5 8.27614 15.5 8C15.5 7.72386 15.7239 7.5 16 7.5C16.2761 7.5 16.5 7.72386 16.5 8Z"></path>
                            </svg>
                            <div>
                                collection
                            </div>
                        </div>
                    </div>


                </div>
                <div id="walletContent">
                    {loadingContent ? (
                        <div>loading</div>
                    ) : (
                        <ProfileContent
                            selectedTab={selectedTab}
                            cards={cards}
                            transactions={transactions}
                            collection={collection}
                            user={userData}
                            videos={videos}
                            unlockedMedia={unlockedMedia}
                            likedMedia={likedMedia}
                            username={userData.username}
                            profileImg={userData.profileImg}
                        />
                    )}
                </div>
            </div>
            <BottomNavBlock />
        </div>
    );
}