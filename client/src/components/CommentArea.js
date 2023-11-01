import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./styles/commentAreaStyle.css";

export default function CommentArea(props) {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [commentContent, setCommentComment] = useState("");
    const [comments, setComments] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);

    const observer = useRef();

    const lastCommentRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(pageNumber => pageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        setLoading(true);
        getComments();
    }, [pageNumber])

    async function getComments() {
        let cutoff;
        if (comments.length > 0 && comments.length % 10 === 0) {
            cutoff = comments[comments.length - 1].createdAt
        }
        try {
            const res = await axios.post("/media/get-comments", { videoID: props.videoID, cutoff });

            if (res.data.populatedComments.length < 10) { setHasMore(false); }
            setComments(prevComments => { return [...new Set([...prevComments, ...res.data.populatedComments])] });
            setLoading(false)
        } catch (error) {

        }
    }

    async function postNewComment() {
        if (commentContent && props.videoID) {
            try {
                const res = await axios.post("/media/new-comment", { newComment: { content: commentContent, userID: user._id, videoID: props.videoID } });
                setCommentComment("");
     
            } catch (error) {
       
            }
        }
    }

    return (
        <div id="commentArea">
            <div id="commentTop">
                {comments.length > 0 ? 
                comments.map((comment, index) => {
                    if (comments.length === index + 1) {
                        return <div className="comment" ref={lastCommentRef} key={comment._id}>{comment.content}</div>
                    } else {
                        return <div className="comment" key={comment._id}>{comment.content}</div>
                    }
                })
                :
                <div id="noComments">
                    no comments
                         </div>
            }
            </div>
            <div id="commentBottom">
                <input id="commentInput" value={commentContent} onChange={(e) => setCommentComment(e.target.value)}></input>
                <div id="postComment" onClick={() => postNewComment()}>submit</div>
            </div>
        </div>
    )
}