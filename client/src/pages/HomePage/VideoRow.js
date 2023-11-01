import React from "react";
import PreviewComponent from "../../components/PreviewComponent";
import "./styles/homeStyle.css";

export default function VideoRow(props) {

    function scrollRight() {
        let row = document.getElementById(props.type);
        row.scrollLeft += 300;
    }

    function scrollLeft() {
        let row = document.getElementById(props.type);
        row.scrollLeft -= 300;
    }

    // add the left scroll btn if the row has been scrolled
    function scrollChecker() {
        if (document.getElementById(props.type).scrollLeft >= 23) {
            document.getElementById(props.type + "Btn").style.opacity = 100;
        } else {
            document.getElementById(props.type + "Btn").style.opacity = 0;
        }
    }

    let numShown = 2;
    function showMore() {
        // let currentLength = topVideos.length;
        // setTopVideos(topVideos => topVideos.concat([...topVideosTotal.slice(currentLength, currentLength + 3)]));
        numShown += 3; // increase the number of shown components by 3
        const components = document.querySelectorAll('.preview' + props.type);
        // show/hide components based on the number shown
        for (let i = 0; i < numShown; i++) {
            if (i < components.length) {
                if (i < numShown) {
                    components[i].style.display = 'inline-block';
                } else {
                    components[i].style.display = 'none';
                }
            }
        }
    }

    return (
        <div className="homeVideoRowFlex">
            <div className="videoRowTitle">
                {props.title}
            </div>
            <div className="videoRow" id={props.type} onScroll={() => scrollChecker()}>
                {props.content.map((video, index) => {
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
                            timestamp={video.timestamp}
                            username={video.user?.username}
                            userPic={video.user?.profileImg}
                        />
                    )
                })}
            </div>
            <div className="rowBtnBgLeft" id={props.type + "Btn"} onClick={() => scrollLeft()}>
                <div className="rowBtn">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.25 6.75L4.75 12L10.25 17.25"></path>
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 12H5"></path>
                    </svg>
                </div>
            </div>
            <div className="rowBtnBgRight" onClick={() => scrollRight()}>
                <div className="rowBtn">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.75 6.75L19.25 12L13.75 17.25"></path>
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H4.75"></path>
                    </svg>
                </div>
            </div>
            <div className="vidRowFade">

            </div>
            <div id="showMoreBtn" onClick={() => showMore()}>
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
        </div>
    );
}