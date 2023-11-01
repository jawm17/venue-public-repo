import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./styles/headerSearchStyle.css";

export default function HeaderSearch(props) {
    const history = useHistory();
    const [videoResults, setVideoResults] = useState([]);
    const [userResults, setUserResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState(props.query || "");
    const [loading, setLoading] = useState(false);

    const [mediaType, setMediaType] = useState("videos");

    const style = {
        display: searching ? "initial" : "none"
    }

    useEffect(() => {
        if (query) {
            setSearching(true);
            setLoading(true);
            if (mediaType === "videos") {
                getVideos();
            } else {
                getUsers();
            }
        } else {
            setUserResults([]);
            setVideoResults([]);
        }
    }, [query, mediaType])

    function submitSearch(e) {
        e.preventDefault();
    }

    async function getVideos() {
        try {
            const data = await axios.post("/media/query/videos", { query });
   
            if (data.data?.videoList) {
                setVideoResults(data.data.videoList.reverse());
                setLoading(false);
            } else {
                // no results
            }
        } catch (error) {

        }
    }

    async function getUsers() {
        try {
            const data = await axios.post("/media/query/users", { query });

            if (data.data?.users) {
                setUserResults(data.data.users.reverse());
                setLoading(false);
            } else {
                // no results
            }
        } catch (error) {

        }
    }

    const VideoSearchSample = (props) => {
        return (
            <div className="videoSearchSample" onClick={() => videoSelected(props.video._id)}>
                <img className="videoSearchThumb" src={props.video.thumbSrc}></img>
                <div className="videoSearchTitleUser">
                    <div className="videoSearchTitle">{props.video.title}</div>
                    <div className="videoSearchUserName">{props.video.user?.username}</div>
                </div>
                <div className="searchPriceTag">
                    {props.video.price ? ("$" + props.video.price) : "FREE"}
                </div>
            </div>
        );
    }

    const UserSearchSample = (props) => {
        return (
            <div className="userSearchSample" onClick={() => userSelected(props.user.username)}>
                <img className="userSearchImg" src={props.user.profileImg}></img>
                <div className="userSearchUserName">{props.user.username}</div>
                {/* <div className="searchPriceTag">
                {props.video.price ? ("$" + props.video.price) : "FREE"}
            </div> */}
            </div>
        );
    }

    function videoSelected(id) {
        history.push("/video/" + id);
        setSearching(false);
        setQuery("");
    }

    function userSelected(id) {
        history.push("/user/" + id);
        setSearching(false);
        setQuery("");
    }

    function closeSearch() {
        document.getElementById("searchBarArea").style.display = "none";
        setLoading(false);
        setQuery("");
    }

    function editQuery(e) {
        const regexChars = /[.*+?^${}()|[\]\\]/g; // characters to be removed
        if (regexChars.test(e.target.value)) {
            const filteredInput = e.target.value.replace(regexChars, '');
            // use the filtered input in your mongoose query
            setQuery(filteredInput);
        } else {
            setQuery(e.target.value)
            // use the original input in your mongoose query
        }
    }


    return (
        <div id="searchBarArea">
            <div id="searchBlur" style={style} onClick={() => setSearching(false)}>

            </div>
            <div id="searchBarBg" style={searching ? { borderColor: "var(--green)" } : { borderColor: "#3d4950" }}>
                <div id="searchIconFlex">
                    <svg id="searchIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z" />
                    </svg>
                </div>
                <form onSubmit={(e) => submitSearch(e)}>
                    <input autoComplete="off" id="searchInput" value={query} onChange={(e) => editQuery(e)} onFocus={() => setSearching(true)}></input>
                </form>
                <div id="searchModal" style={style}>
                    <div id="resultSwitcher">
                        <div id="resultTabsArea">
                            <div onClick={() => setMediaType("videos")} className={mediaType === "videos" ? "selectedResultsTab" : "resultsTab"}>
                                videos
                            </div>
                            <div onClick={() => setMediaType("users")} className={mediaType === "users" ? "selectedResultsTab" : "resultsTab"}>
                                users
                            </div>
                        </div>
                    </div>
                    <div id="searchModalResults">
                        <div id="searchResultsArea">
                            {!loading ?
                                mediaType === "videos" ?
                                    videoResults?.length > 0 ? videoResults.map(video => {
                                        return <VideoSearchSample video={video} />
                                    }) : query ? <div className="noResultMsg">no results found</div> : null
                                    :
                                    userResults?.length > 0 ? userResults.map(user => {
                                        return <UserSearchSample user={user} />
                                    }) : query ? <div className="noResultMsg">no results found</div> : null
                                :
                                <div id="searchLoaderArea">
                                    <div className="searchLoaderFlex">
                                        <div className="searchLoader">
                                        </div>
                                    </div>
                                    loading results...
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="headerCircleBtn" id="cancelSearchBtn" onClick={() => closeSearch()}>
                <div className="headerIcon">
                    <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}