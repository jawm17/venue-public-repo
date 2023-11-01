import React from "react";
// import Skeleton from '@mui/material/Skeleton';
import PreviewPlaceHolder from "../../components/PreviewPlaceHolder";

export default function VideoRowPlaceHolder() {
    const placeholders = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",]

    return (
        <div className="homeVideoRowFlex">
            <div className="videoRowTitlePlaceHolder">
                {/* <Skeleton width={210} height={40} style={{backgroundColor: "var(--graySecond)"}}/> */}
            </div>
            <div className="videoRow">
                {placeholders.map((video, index) => {
                    return (
                        <PreviewPlaceHolder 
                            index={index}
                        />
                    )
                })}
            </div>
        </div>
    );
}