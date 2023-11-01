import React from "react";
import ActivityTx from "../../components/ActivityTx";
import CommentSection from "./CommentSection.js";
import PreviewComponent from "../../components/PreviewComponent";

export default function VideoContent(props) {

    if (props.selectedTab === "comments") {
        return (
            <CommentSection videoID={props.videoData._id} unlocked={props.unlocked}/>
        );
    } else if (props.selectedTab === "related") {
        return (
            <div className="contentGrid" id="relatedContentGrid">
                {props.relatedContent.map((video, index) => {
                    return (
                        <PreviewComponent
                            type={props.type}
                            index={index}
                            key={video._id + props.type}
                            videoID={video._id}
                            price={video.price}
                            thumb={video.thumbSrc}
                            timestamp={video.timestamp}
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
        )
    } else {
        if (props.txs.length > 0) {
            return (
                <div id="activityContent">
                    {props.txs.map(tx => {
                        return (
                            <ActivityTx
                                key={tx._id}
                                tx={tx}
                            />
                        )
                    })}
                </div>
            );
        } else {
            return (
                <div id="relatedContent">
                    no activity
                </div>
            )
        }
    }
}