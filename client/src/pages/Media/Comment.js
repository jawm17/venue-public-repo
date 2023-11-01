import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import "./styles/commentStyle.css";

export default function Comment(props) {
    const history = useHistory();
    const [liked, setLiked] = useState(false);
    return (
        <div className="comment">
            <div className="commentPicFlex">
                <img onClick={() => history.push("/user/" + props.user.username)} className="commentUserPic" src={props.user.profileImg}></img>
            </div>
            <div className="contentFlex">
                <div className="commentContentArea">
                    <div onClick={() => history.push("/user/" + props.user.username)} className="commentUsername">
                        {props.user.username}
                    </div>
                    <div className="commentContent">
                        {props.content}
                    </div>
                </div>
            </div>
            {/* <div className="heartFlex">
            <svg onClick={() => setLiked(!liked)} className="commentHeart" width="24" height="24" fill={liked ? "red" : "none"} viewBox="0 0 24 24">
                <path fill-rule="evenodd" stroke={liked ? "red" : "black"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z" clip-rule="evenodd"></path>
            </svg>
            </div> */}
        </div>
    );
}