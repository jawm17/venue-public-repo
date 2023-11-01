import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import HeaderMain from "../../components/HeaderMain";
import DirectSend from "../../components/DirectSend";
import ProfileContent from "./ProfileContent";
import AuthWindow from "../../components/AuthWindow";
import "./profileStyle.css";
import CollectModal from "./CollectModal";

export default function ProfilePre(props) {
  const history = useHistory();
  const { setIsAuthenticated, setUser, user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [solEarned, setSolEarned] = useState(0);
  const [userData, setUserData] = useState([]);
  const [txs, setTxs] = useState([]);
  const [sending, setSending] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("videos");
  const [likedMedia, setLikedMedia] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingContent, setLoadingContent] = useState(true);
  const [authWindow, setAuthWindow] = useState(false);

  const [heroLoaded, setHeroLoaded] = useState(false);
  const [picLoaded, setPicLoaded] = useState(false);

  useEffect(() => {
    if (props.match.params.user) {
      getUserInfo();
    }
  }, [props.match.params.user]);

  async function getUserInfo() {
    try {
      const res = await axios.post("/user/profile-content", { username: props.match.params.user });
      console.log(res);
      if (res.data?.user) {
        if (user) {
          let following = res.data.user.followers.find(
            (userSubject) => userSubject.toString() === user._id.toString()
          );
          if (following) {
            setIsFollowing(true);
          }
        }
        setVideos(res.data.videos.reverse());
        setUserData(res.data.user);
        getTxs(res.data.user._id);
        setLoadingContent(false);
        getRecievedTxs(res.data.user._id);
      } else {
        history.push("/home");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getTxs(userID) {
    try {
      const data = await axios.post("/tx/get-txs", { userID });
      if (data.data?.txs.length > 0) {
        setTxs(data.data.txs.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getRecievedTxs(userID) {
    try {
      const data = await axios.post("/tx/get-txs-to", { userID });
      console.log(data)
      if (data.data?.txs.length > 0) {
        let earned = 0;
        data.data.txs.forEach((tx) => {
          console.log(tx.to.toString())
          if (tx.to._id.toString() === userID.toString() && tx.type === "unlock") {
            earned = earned + tx.amount;
          }
        });
        setSolEarned(earned);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getLikedContent(likedList) {
    try {
      const data = await axios.post("/user/get-liked-content", { likedList });
      if (data.data?.likedContent) {
        setLikedMedia(data.data.likedContent);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function followUser() {
    if (user) {
      try {
        const data = await axios.post("/user/follow", {
          userSubject: userData._id,
        });
        // if (data.data?.likedContent) {
        //     setLikedMedia(data.data.likedContent);
        // }
        setIsFollowing(true);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setAuthWindow(true);
    }
  }

  async function unFollowUser() {
    if (user) {
      try {
        const data = await axios.post("/user/unfollow", {
          userSubject: userData._id,
        });
        // if (data.data?.likedContent) {
        //     setLikedMedia(data.data.likedContent);
        // }
        setIsFollowing(false);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setAuthWindow(true);
    }
  }

  const ProfileStat = (props) => {
    return (
      <div className="profileStat">
        <div>
          <div>{props.value}</div>
          <div>{props.label}</div>
        </div>
      </div>
    );
  };

  const TabBtn = (props) => {
    return (
      <div
        onClick={() => setSelectedTab(props.tab)}
        className={
          selectedTab === props.tab ? "selectedAccountTab" : "accountTab"
        }
      >
        {props.tab}
      </div>
    );
  };

  return (
    <div id="profile">
      <HeaderMain />
      <CollectModal />
      {authWindow ? <AuthWindow cancel={() => setAuthWindow(false)} /> : null}
      {sending ? (
        <DirectSend
          username={userData.username}
          userID={userData._id}
          userAddress={userData.address}
          close={() => setSending(false)}
        />
      ) : null}
      <div id="profileHeroArea">
        <img id="profileHeroMain" src={userData?.heroImg} onLoad={() => setHeroLoaded(true)} style={heroLoaded ? {display: "initial"} : {display: "none"}}></img>
        <div id="profileImgBorder">
          <img id="profileImgMain" src={userData?.profileImg} onLoad={() => setPicLoaded(true)} style={picLoaded ? {display: "initial"} : {display: "none"}}></img>
        </div>
      </div>
      <div id="profileInfoFlex">
        <div id="profileInfoArea">
          <div id="profileRow1">
            <div id="profileUsername">{userData?.username}</div>
            <div id="followSendRow">
              {isFollowing ? (
                <div
                  className="followBtn"
                  id="unfollow"
                  onClick={() => unFollowUser()}
                >
                  unfollow
                </div>
              ) : (
                  <div className="followBtn" onClick={() => followUser()}>
                    collect
                  </div>
                )}
              <div id="profileSendBtn" onClick={() => user ? setSending(true) : setAuthWindow(true)}>
                <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z"
                  ></path>
                  <path
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 15.5V12.75"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div id="profileBio">{userData?.bio}</div>
          <div id="profileStatsOuter">
            <div id="profileStatsFlex">
              <ProfileStat
                value={parseFloat(solEarned.toFixed(6))}
                label="ETH earned"
              />
              <div className="verticalDiv"></div>
              <ProfileStat
                value={userData?.followers?.length || 0}
                label="followers"
              />
              <div className="verticalDiv"></div>
              <ProfileStat
                value={userData?.following?.length || 0}
                label="following"
              />
            </div>
          </div>
          <div id="followSendFlex2">
            <div id="followSendArea2">
              {isFollowing ? (
                <div
                  className="followBtn2"
                  id="unfollow"
                  onClick={() => unFollowUser()}
                >
                  unfollow
                </div>
              ) : (
                  <div className="followBtn2" onClick={() => followUser()}>
                    follow
                  </div>
                )}
              <div id="profileSendBtn" onClick={() => setSending(true)}>
                <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z"
                  ></path>
                  <path
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M12 15.5V12.75"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="profileTabsFlex">
        <div id="profileTabs">
          <div id="profileTabBtns">
            <TabBtn tab="videos" />
            <TabBtn tab="activity" />
          </div>
        </div>
      </div>

      <div id="profileContentFlex">
        <div id="profileContent">
          {loadingContent ? (
            <div>loading</div>
          ) : (
              <ProfileContent
                username={userData.username}
                profileImg={userData.profileImg}
                selectedTab={selectedTab}
                videos={videos}
                txs={txs}
              />
            )}
        </div>
      </div>
    </div>
  );
}
