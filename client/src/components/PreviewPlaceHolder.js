import React from "react";
// import Skeleton from '@mui/material/Skeleton';

export default function PreviewPlaceHolder(props) {

    return (
        <div className={props.index === 0 ? "firstPreviewOuter" : "previewOuter"}>
            <div className="topPreviewComponent">
            {/* <Skeleton variant="rectangular" width={"100%"} height={"100%"} style={{ borderRadius: 6}}/> */}
            </div>
        </div>
    );
}