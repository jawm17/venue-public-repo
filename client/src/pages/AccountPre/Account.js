import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import HeaderMain from "../../components/HeaderMain";
import axios from "axios";
import "./accountStyle.css";
import UploadHero from "../../components/UploadHero";
import UploadProfile from "../../components/UploadProfile";
import SettingsModal from "../../components/SettingsModal";
import AccountContent from "./AccountContent";
import CreateModal from "./CreateModal";
var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider);

export default function Account(props) {
  const history = useHistory();
  const { user, getUser } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("videos");
  const [videos, setVideos] = useState([]);
  const [solEarned, setSolEarned] = useState(0);
  const [userData, setUserData] = useState([]);
  const [txs, setTxs] = useState([]);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);

  const [unlockedMedia, setUnlockedMedia] = useState([]);
  const [likedMedia, setLikedMedia] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);

  const [heroLoaded, setHeroLoaded] = useState(false);
  const [picLoaded, setPicLoaded] = useState(false);

  useEffect(() => {
    getUserInfo();
    // getTokenBalance();
  }, []);

  async function getTokenBalance() {
    const contract = new web3.eth.Contract([{ "inputs": [{ "internalType": "contract ENS", "name": "_ens", "type": "address" }, { "internalType": "bytes32", "name": "_baseNode", "type": "bytes32" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "controller", "type": "address" }], "name": "ControllerAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "controller", "type": "address" }], "name": "ControllerRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "expires", "type": "uint256" }], "name": "NameMigrated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "expires", "type": "uint256" }], "name": "NameRegistered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "expires", "type": "uint256" }], "name": "NameRenewed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "GRACE_PERIOD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "controller", "type": "address" }], "name": "addController", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "available", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "baseNode", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "controllers", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ens", "outputs": [{ "internalType": "contract ENS", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "nameExpires", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }], "name": "reclaim", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "register", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "registerOnly", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "controller", "type": "address" }], "name": "removeController", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "renew", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "resolver", "type": "address" }], "name": "setResolver", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "bytes4", "name": "interfaceID", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }], "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85")
    const balance = await contract.methods.balanceOf("0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85").call()

  }

  async function getUserInfo() {
    setLoadingContent(true);
    try {
      const res = await axios.get("/user/account-content");

      setVideos(res.data.user.videos.reverse());
      setUserData(res.data.user);
      getUnlockedContent();
      getTxs();
      getLikedContent(res.data.user.likes);
      setLoadingContent(false);
      getRecievedTxs(res.data.user._id);
    } catch (err) {

    }
  }

  async function getRecievedTxs(userID) {
    try {
      const data = await axios.post("/tx/get-txs-to", { userID });
      if (data.data?.txs.length > 0) {
        let earned = 0;
        data.data.txs.forEach((tx) => {

          if (tx.to._id.toString() === userID.toString() && tx.type === "unlock") {
            earned = earned + tx.amount;
          }
        });
        setSolEarned(earned);
      }
    } catch (err) {

    }
  }

  // get txs sent from user (activity tab)
  async function getTxs() {
    try {
      const data = await axios.post("/tx/get-txs", { userID: user._id });
      if (data.data?.txs.length > 0) {
        setTxs(data.data.txs.reverse());
      }
    } catch (err) {

    }
  }

  // get content unlocked by user (unlocked media tab)
  async function getUnlockedContent() {
    try {
      const data = await axios.post("/user/get-unlocked-content", { userID: user._id });
      if (data.data?.unlocked) {
        setUnlockedMedia(data.data.unlocked);
      }

    } catch (err) {

    }
  }

  // get liked content (liked media tab)
  async function getLikedContent(likedList) {
    try {
      const data = await axios.post("/user/get-liked-content", { likedList });
      if (data.data?.likedContent) {
        setLikedMedia(data.data.likedContent);
      }
    
    } catch (err) {

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

  return (
    <div id="profile">

      <HeaderMain />
      {editing ? (
        <SettingsModal
          email={userData.email}
          name={userData.username}
          bio={userData.bio}
          updateStats={() => getUserInfo()}
          close={() => setEditing(false)}
        />
      ) : null}
      {creating ? (
        <CreateModal />
      ) : null}
      <div id="profileHeroArea">
        <img id="profileHeroMain" src={userData?.heroImg} onLoad={() => setHeroLoaded(true)} style={heroLoaded ? { display: "initial" } : { display: "none" }}></img>
        <div id="editHeroBtn">
          <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 19.25H13.75"></path>
          </svg>

          <UploadHero refresh={() => getUserInfo()} />
        </div>
        <div id="profileImgBorder">
          <img id="profileImgMain" src={userData?.profileImg} onLoad={() => setPicLoaded(true)} style={picLoaded ? { display: "initial" } : { display: "none" }}></img>
          <div id="editProfilePic">
            <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"></path>
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 19.25H13.75"></path>
            </svg>

            <UploadProfile refresh={() => getUserInfo()} />
          </div>

        </div>
      </div>
      <div id="profileInfoFlex">
        <div id="profileInfoArea">
          <div id="profileRow1">
            <div id="profileUsername">{userData?.username}</div>
            <div id="followSendRow">
              <div className="followBtn" onClick={() => history.push("/create")}>create</div>
              <div id="profileSendBtn" onClick={() => setEditing(true)}>
                <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13.1191 5.61336C13.0508 5.11856 12.6279 4.75 12.1285 4.75H11.8715C11.3721 4.75 10.9492 5.11856 10.8809 5.61336L10.7938 6.24511C10.7382 6.64815 10.4403 6.96897 10.0622 7.11922C10.006 7.14156 9.95021 7.16484 9.89497 7.18905C9.52217 7.3524 9.08438 7.3384 8.75876 7.09419L8.45119 6.86351C8.05307 6.56492 7.49597 6.60451 7.14408 6.9564L6.95641 7.14408C6.60452 7.49597 6.56492 8.05306 6.86351 8.45118L7.09419 8.75876C7.33841 9.08437 7.3524 9.52216 7.18905 9.89497C7.16484 9.95021 7.14156 10.006 7.11922 10.0622C6.96897 10.4403 6.64815 10.7382 6.24511 10.7938L5.61336 10.8809C5.11856 10.9492 4.75 11.372 4.75 11.8715V12.1285C4.75 12.6279 5.11856 13.0508 5.61336 13.1191L6.24511 13.2062C6.64815 13.2618 6.96897 13.5597 7.11922 13.9378C7.14156 13.994 7.16484 14.0498 7.18905 14.105C7.3524 14.4778 7.3384 14.9156 7.09419 15.2412L6.86351 15.5488C6.56492 15.9469 6.60451 16.504 6.9564 16.8559L7.14408 17.0436C7.49597 17.3955 8.05306 17.4351 8.45118 17.1365L8.75876 16.9058C9.08437 16.6616 9.52216 16.6476 9.89496 16.811C9.95021 16.8352 10.006 16.8584 10.0622 16.8808C10.4403 17.031 10.7382 17.3519 10.7938 17.7549L10.8809 18.3866C10.9492 18.8814 11.3721 19.25 11.8715 19.25H12.1285C12.6279 19.25 13.0508 18.8814 13.1191 18.3866L13.2062 17.7549C13.2618 17.3519 13.5597 17.031 13.9378 16.8808C13.994 16.8584 14.0498 16.8352 14.105 16.8109C14.4778 16.6476 14.9156 16.6616 15.2412 16.9058L15.5488 17.1365C15.9469 17.4351 16.504 17.3955 16.8559 17.0436L17.0436 16.8559C17.3955 16.504 17.4351 15.9469 17.1365 15.5488L16.9058 15.2412C16.6616 14.9156 16.6476 14.4778 16.811 14.105C16.8352 14.0498 16.8584 13.994 16.8808 13.9378C17.031 13.5597 17.3519 13.2618 17.7549 13.2062L18.3866 13.1191C18.8814 13.0508 19.25 12.6279 19.25 12.1285V11.8715C19.25 11.3721 18.8814 10.9492 18.3866 10.8809L17.7549 10.7938C17.3519 10.7382 17.031 10.4403 16.8808 10.0622C16.8584 10.006 16.8352 9.95021 16.8109 9.89496C16.6476 9.52216 16.6616 9.08437 16.9058 8.75875L17.1365 8.4512C17.4351 8.05308 17.3955 7.49599 17.0436 7.1441L16.8559 6.95642C16.504 6.60453 15.9469 6.56494 15.5488 6.86353L15.2412 7.09419C14.9156 7.33841 14.4778 7.3524 14.105 7.18905C14.0498 7.16484 13.994 7.14156 13.9378 7.11922C13.5597 6.96897 13.2618 6.64815 13.2062 6.24511L13.1191 5.61336Z"
                  ></path>
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13.25 12C13.25 12.6904 12.6904 13.25 12 13.25C11.3096 13.25 10.75 12.6904 10.75 12C10.75 11.3096 11.3096 10.75 12 10.75C12.6904 10.75 13.25 11.3096 13.25 12Z"
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
              <div className="followBtn2" onClick={() => history.push("/create")}>create</div>
              <div id="profileSendBtn" onClick={() => setEditing(true)}>
                <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13.1191 5.61336C13.0508 5.11856 12.6279 4.75 12.1285 4.75H11.8715C11.3721 4.75 10.9492 5.11856 10.8809 5.61336L10.7938 6.24511C10.7382 6.64815 10.4403 6.96897 10.0622 7.11922C10.006 7.14156 9.95021 7.16484 9.89497 7.18905C9.52217 7.3524 9.08438 7.3384 8.75876 7.09419L8.45119 6.86351C8.05307 6.56492 7.49597 6.60451 7.14408 6.9564L6.95641 7.14408C6.60452 7.49597 6.56492 8.05306 6.86351 8.45118L7.09419 8.75876C7.33841 9.08437 7.3524 9.52216 7.18905 9.89497C7.16484 9.95021 7.14156 10.006 7.11922 10.0622C6.96897 10.4403 6.64815 10.7382 6.24511 10.7938L5.61336 10.8809C5.11856 10.9492 4.75 11.372 4.75 11.8715V12.1285C4.75 12.6279 5.11856 13.0508 5.61336 13.1191L6.24511 13.2062C6.64815 13.2618 6.96897 13.5597 7.11922 13.9378C7.14156 13.994 7.16484 14.0498 7.18905 14.105C7.3524 14.4778 7.3384 14.9156 7.09419 15.2412L6.86351 15.5488C6.56492 15.9469 6.60451 16.504 6.9564 16.8559L7.14408 17.0436C7.49597 17.3955 8.05306 17.4351 8.45118 17.1365L8.75876 16.9058C9.08437 16.6616 9.52216 16.6476 9.89496 16.811C9.95021 16.8352 10.006 16.8584 10.0622 16.8808C10.4403 17.031 10.7382 17.3519 10.7938 17.7549L10.8809 18.3866C10.9492 18.8814 11.3721 19.25 11.8715 19.25H12.1285C12.6279 19.25 13.0508 18.8814 13.1191 18.3866L13.2062 17.7549C13.2618 17.3519 13.5597 17.031 13.9378 16.8808C13.994 16.8584 14.0498 16.8352 14.105 16.8109C14.4778 16.6476 14.9156 16.6616 15.2412 16.9058L15.5488 17.1365C15.9469 17.4351 16.504 17.3955 16.8559 17.0436L17.0436 16.8559C17.3955 16.504 17.4351 15.9469 17.1365 15.5488L16.9058 15.2412C16.6616 14.9156 16.6476 14.4778 16.811 14.105C16.8352 14.0498 16.8584 13.994 16.8808 13.9378C17.031 13.5597 17.3519 13.2618 17.7549 13.2062L18.3866 13.1191C18.8814 13.0508 19.25 12.6279 19.25 12.1285V11.8715C19.25 11.3721 18.8814 10.9492 18.3866 10.8809L17.7549 10.7938C17.3519 10.7382 17.031 10.4403 16.8808 10.0622C16.8584 10.006 16.8352 9.95021 16.8109 9.89496C16.6476 9.52216 16.6616 9.08437 16.9058 8.75875L17.1365 8.4512C17.4351 8.05308 17.3955 7.49599 17.0436 7.1441L16.8559 6.95642C16.504 6.60453 15.9469 6.56494 15.5488 6.86353L15.2412 7.09419C14.9156 7.33841 14.4778 7.3524 14.105 7.18905C14.0498 7.16484 13.994 7.14156 13.9378 7.11922C13.5597 6.96897 13.2618 6.64815 13.2062 6.24511L13.1191 5.61336Z"
                  ></path>
                  <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13.25 12C13.25 12.6904 12.6904 13.25 12 13.25C11.3096 13.25 10.75 12.6904 10.75 12C10.75 11.3096 11.3096 10.75 12 10.75C12.6904 10.75 13.25 11.3096 13.25 12Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="accountTabsFlex">
        <div id="accountTabs">
          <div id="accountTabBtns">
            <div
              onClick={() => setSelectedTab("videos")}
              className={
                selectedTab === "videos" ? "selectedAccountTab" : "accountTab"
              }
              id="videosTab"
            >
              videos ({videos ? videos.length : 0})
            </div>
            <div
              onClick={() => setSelectedTab("unlocked")}
              className={
                selectedTab === "unlocked" ? "selectedAccountTab" : "accountTab"
              }
              id="unlockedTab"
            >
              unlocked media ({unlockedMedia ? unlockedMedia.length : 0})
            </div>
            <div
              onClick={() => setSelectedTab("liked")}
              className={
                selectedTab === "liked" ? "selectedAccountTab" : "accountTab"
              }
              id="likedTab"
            >
              liked media ({likedMedia ? likedMedia.length : 0})
            </div>
            <div
              onClick={() => setSelectedTab("activity")}
              className={
                selectedTab === "activity" ? "selectedAccountTab" : "accountTab"
              }
              id="activityTab"
            >
              activity
            </div>
          </div>
        </div>
      </div>

      <div id="profileContentFlex">
        <div id="profileContent">
          {loadingContent ? (
            <div>loading</div>
          ) : (
            <AccountContent
              username={userData.username}
              profileImg={userData.profileImg}
              selectedTab={selectedTab}
              videos={videos}
              unlockedMedia={unlockedMedia}
              likedMedia={likedMedia}
              txs={txs}
            />
          )}
        </div>
      </div>
    </div>
  );

}