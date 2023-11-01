import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import HeaderMain from "../../components/HeaderMain";
import VideoSearchResult from "./VideoSearchResult";
import PreviewComponent from "../../components/PreviewComponent";
import UserSearchResult from "./UserSearchResult";
import "./searchPageStyle.css"

export default function SearchPage(props) {
    const history = useHistory();
    const [videoResults, setVideoResults] = useState([]);
    const [userResults, setUserResults] = useState([]);
    const [searchType, setSearchType] = useState("video");
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState(props.match.params.query || "");

    function submitSearch(e) {
        e.preventDefault();
        if (query) {
            history.push("/search/" + query);
        }
    }

    const style = {
        videoTab: {
            fontWeight: searchType === "video" ? "bold" : "normal",
            borderBottomColor: searchType === "video" ? "black" : "lightgray"
        },
        userTab: {
            fontWeight: searchType === "users" ? "bold" : "normal",
            borderBottomColor: searchType === "users" ? "black" : "lightgray"
        }
    }

    useEffect(() => {
        setVideoResults([]);
        setUserResults([]);

        if (props.match.params.query) {
            if (searchType === "video") {
                getVideos();
            } else {
                getUsers();
            }
        } else {
            // history.push("/");
        }
    }, [props.match.params.query, searchType]);

    async function getVideos() {
        try {
            const data = await axios.post("/media/query/videos", { query: props.match.params.query });
            console.log(data);
            if (data.data?.videoList) {
                setVideoResults(data.data.videoList.reverse());
            } else {
                // no results
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getUsers() {
        //get users matching the search term
        try {
            const data = await axios.post("/media/query/users", { query: props.match.params.query });
            console.log(data);
            if (data.data?.users) {
                setUserResults(data.data.users.reverse());
            } else {
                // no results
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <HeaderMain query={props.match.params.query} />
            <div id="searchPageArea">
                <div id="mSearchBarArea">
                    <div id="mSearchBarBg" style={searching ? { borderColor: "rgb(95, 247, 95)" } : { borderColor: "gray" }}>
                        <div id="searchIconFlex">
                            <svg id="searchIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z" />
                            </svg>
                        </div>
                        <form onSubmit={(e) => submitSearch(e)}>
                            <input autoComplete="off" id="searchInput" value={query} onChange={(e) => setQuery(e.target.value)} onBlur={() => setSearching(false)} onFocus={() => setSearching(true)}></input>
                        </form>
                    </div>
                </div>
                {props.match.params.query ?
                    <div>
                        <div id="searchTitle">
                            search results for <div id="searchTerm">{props.match.params.query}</div>
                        </div>
                        <div id="searchTabsFlex">
                            <div id="searchTabs">
                                <div onClick={() => setSearchType("video")} className={searchType === "video" ? "selectedSearchTab" : "searchTab"} id="videoTab">
                                    videos
                                </div>
                                <div onClick={() => setSearchType("user")} className={searchType === "user" ? "selectedSearchTab" : "searchTab"} id="userTab">
                                    users
                                </div>
                            </div>
                        </div>
                        <div id="resultsFlex">
                            <div id="resultsArea">
                                {
                                    searchType === "video" ?
                                        (
                                            videoResults?.map(video => {
                                                return <PreviewComponent
                                                    key={video._id}
                                                    videoID={video._id}
                                                    price={video.price}
                                                    thumb={video.thumbSrc}
                                                    timestamp={video.timestamp}
                                                    title={video.title}
                                                    views={video.viewHistory?.length}
                                                    solEarned={video.solEarned}
                                                    username={video.user?.username}
                                                    userPic={video.user?.profileImg}
                                                />
                                            })
                                        ) :
                                        (
                                            userResults?.map(user => {
                                                return <UserSearchResult
                                                    key={user._id}
                                                    userID={user._id}
                                                    username={user.username}
                                                    profileImg={user.profileImg}
                                                    heroImg={user.heroImg}
                                                    followers={user.followers.length}
                                                />

                                            })
                                        )
                                }
                            </div>
                        </div>
                    </div>
                    : null}
            </div>
        </div>
    );
}
