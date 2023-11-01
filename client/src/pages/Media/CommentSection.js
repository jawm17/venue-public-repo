import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Comment from "./Comment";
import AuthWindow from "../../components/AuthWindow";
import "./styles/commentStyle.css";

export default function CommentSection(props) {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [authWindow, setAuthWindow] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [typing, setTyping] = useState(false);


    useEffect(() => {
        getComments();
    }, []);

    async function getComments() {
        try {
            const data = await axios.post("/media/get-all-comments", { videoID: props.videoID });
   
            if (data.data?.comments.length > 0) {
                setComments(data.data.comments);
            }
        } catch (error) {
      
        }
    }

    async function postNewComment(e) {
        if (e) {
            e.preventDefault();
        }
        if (newComment && user) {
            try {
                const res = await axios.post("/media/new-comment", { content: newComment, videoID: props.videoID });
                setNewComment("");
                getComments();
            } catch (error) {
                console.log(error);
            }
        } else if (!user) {
            setAuthWindow(true);
        }
    }

    return (
        <div id="commentArea">
            {props.unlocked ?
                null
                :
                <div id="commentsBlur">
                    <div>
                        unlock video to reveal comments
                    </div>
                </div>
            }
            {authWindow ? <AuthWindow cancel={() => setAuthWindow(false)} /> : null}
            <div id="commentTop">
                {
                    comments.length > 0 ?

                        comments.map((comment) => {
                            return <Comment key={comment._id} content={comment.content} user={comment.user} />
                        })
                        :
                        <div id="noComments">
                            no comments
                        </div>
                }
            </div>
            <div id="commentInputFlex">
                <div id="commentInputArea">
                    <div id="commentBarBg" style={typing ? { borderColor: "rgb(95, 247, 95)" } : { borderColor: "transparent" }}>
                        <form onSubmit={(e) => postNewComment(e)}>
                            <input placeholder="share your thoughts" autoComplete="off" id="commentInput" value={newComment} onChange={(e) => setNewComment(e.target.value)} onBlur={() => setTyping(false)} onFocus={() => setTyping(true)} />
                        </form>
                    </div>
                    <div id="postComment" onClick={() => postNewComment()}>post</div>
                </div>
            </div>
        </div>
    );
}