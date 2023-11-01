import React from "react";
// import Skeleton from '@mui/material/Skeleton';

export default function UserPlaceHolder(props) {

    return (
        <div className={props.index === 0 ? "firstTopUserDiv" : "topUserDiv"} id={props.index > 2 ? "smallCutOff" : ""} >
            <div className="topUserFlex">
                {/* <Skeleton variant="rectangular" width={"100%"} height={"100%"} style={{ borderRadius: 6 }} /> */}
            </div>
        </div>
    );
}