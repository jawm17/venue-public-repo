import React, {useState, useEffect} from "react";
// import Skeleton from '@mui/material/Skeleton';
import UserPlaceHolder from "../../components/UserPlaceHolder";
import "./styles/userRowPlaceHolderStyle.css";

export default function UserRowPlaceHolder(props) {
    const placeholders = ["", "", "", "", "", "", "", "", "", ""];

    return (
        <div>
            <div id="userRowTitlePlaceHolder">
                {/* <Skeleton width={210} height={40} style={{backgroundColor: "var(--graySecond)"}}/> */}
            </div>
            <div id="topUsersRow">
                {placeholders.map((video, index) => {
                    return (
                        <UserPlaceHolder  
                            index={index}
                            small={props.small}
                        />
                    )
                })}
            </div>
        </div>
    );
}