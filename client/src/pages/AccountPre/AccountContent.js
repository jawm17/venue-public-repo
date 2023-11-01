import React from "react";
import VideoPreview from "../../components/VideoPreview";
import ActivityTx from "../../components/ActivityTx";
import PreviewComponent from "../../components/PreviewComponent";
import "./accountStyle.css";

export default function AccountContent(props) {
    if (props.selectedTab === "videos") {
        return (
            props.videos.map(video => {
                return (
                    <div className="contentGridBox">
                        <PreviewComponent
                            key={video._id + "created"}
                            videoID={video._id}
                            price={video.price}
                            thumb={video.thumbSrc}
                            title={video.title}
                            timestamp={video.timestamp}
                            views={video.viewHistory?.length}
                            solEarned={video.solEarned}
                            username={props.username}
                            userPic={props.profileImg}
                        />
                    </div>
                )
            })
        )
    } else if (props.selectedTab === "unlocked") {
        return (
            props.unlockedMedia.map(video => {
                return (
                    <div className="contentGridBox">
                        <PreviewComponent
                            key={video._id + "unlocked"}
                            videoID={video._id}
                            price={video.price}
                            thumb={video.thumbSrc}
                            timestamp={video.timestamp}
                            title={video.title}
                            views={video.viewHistory?.length}
                            solEarned={video.solEarned}
                            username={props.username}
                            userPic={props.profileImg}
                        />
                    </div>
                )
            })
        )
    } else if (props.selectedTab === "activity") {
        return (
            <div id="activityArea">
                {props.txs.map(tx => {
                    return (
                        <ActivityTx
                            key={tx._id}
                            tx={tx}
                        />
                    )
                })}
            </div>
        )
    } else if (props.selectedTab === "liked") {
        return (
            props.likedMedia.map(video => {
                return (
                    <div className="contentGridBox">
                        <PreviewComponent
                            key={video._id + "liked"}
                            videoID={video._id}
                            price={video.price}
                            thumb={video.thumbSrc}
                            timestamp={video.timestamp}
                            title={video.title}
                            views={video.viewHistory?.length}
                            solEarned={video.solEarned}
                            username={props.username}
                            userPic={props.profileImg}
                        />
                    </div>
                )
            })
        )
    }
}