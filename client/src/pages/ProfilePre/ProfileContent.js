import React from "react";
import VideoPreview from "../../components/VideoPreview";
import PreviewComponent from "../../components/PreviewComponent";
import ActivityTx from "../../components/ActivityTx";
import "./profileStyle.css";

export default function ProfileContent(props) {
  if (props.selectedTab === "videos") {
    return props.videos.map((video) => {
      return (
        <div className="contentGridBox">
        <PreviewComponent
          key={video._id}
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
      );
    });
  } else if (props.selectedTab === "activity") {
    return (
        <div id="activityArea">
          {props.txs.map((tx) => {
            return <ActivityTx key={tx._id} tx={tx} />;
          })}
        </div>
    );
  }
}
