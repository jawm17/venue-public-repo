import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { app } from '../../base';
import { useHistory } from "react-router-dom";
import "./createStyle.css";

export default function Create() {
    const history = useHistory();
    const { isAuthenticated, setIsAuthenticated, user } = useContext(AuthContext);
    const [videoFile, setVideoFile] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbFile, setThumbFile] = useState("");
    const [thumbUrl, setThumbUrl] = useState("");
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [uploadingThumb, setUploadingThumb] = useState(false);
    const [uploadMessageVid, setUploadMessageVid] = useState("Drag and drop a file or click here");
    const [uploadMessageThumb, setUploadMessageThumb] = useState("Drag and drop a file or click here");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [editingTitle, setEditingTitle] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    const [editingPrice, setEditingPrice] = useState(false);

    useEffect(() => {
        // check if user is authenticated
        if (!isAuthenticated) {
            history.push("/");
        }
    }, [user]);

    async function submitPost() {
        if (videoUrl && thumbUrl && title && description) {
            let newVideo = { user, userID: user._id, videoSrc: videoUrl, thumbSrc: thumbUrl, title: title, description: description, price: (price ? price : 0) }
            try {
                const data = await axios.post("/media/new-video", { newVideo });

                document.getElementById("uploadingPostDiv").style.display = "flex";
                setTimeout(() => {
                    document.getElementById("loadingAnimation").style.display = "none";
                    document.getElementById("successAnimation").style.display = "initial";
                    setTimeout(() => {
                        history.push("/account");
                    }, 800);
                }, 1200);
            } catch (error) {
                setIsAuthenticated(false);
                history.push("/home");
            }
        }
    }

    function dragOverHandler(e) {
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
    }

    // on click select video file handler
    function videoSelectHandler(e) {
        if (e.target.files[0]) {
            let file = e.target.files[0];
            setVideoFile(file);
            // check file extension
            let ext = file.name.slice(file.name.length - 3, file.name.length).toUpperCase();
            if (ext === "MOV" || ext === "MP4" || ext === "AVI") {
                // upload to firebase
                firebaseUpload(file, "video");
                // display animation
                setUploadingVideo(true);
            } else {
                vidFileError();
            }
        }
    }

    // on drop video file handler 
    function videoDropHandler(e) {
        // prevent file opening in browser
        e.preventDefault();
        if (e.dataTransfer.items) {
            let file = e.dataTransfer.items[0].getAsFile();
            setVideoFile(file);
            // check file extension
            let ext = file.name.slice(file.name.length - 3, file.name.length).toUpperCase();
            if (ext === "MOV" || ext === "MP4" || ext === "AVI") {
                // upload to firebase
                firebaseUpload(file, "video");
                // display animation
                setUploadingVideo(true);
            } else {
                vidFileError();
            }
        }
    }

    // on click select thumbnail file handler
    function thumbnailSelectHandler(e) {
        if (e.target.files[0]) {
            let file = e.target.files[0];
            setThumbFile(file);
            // check file extension
            let ext = file.name.slice(file.name.length - 3, file.name.length).toUpperCase();
            if (ext === "PEG" || ext === "PNG") {
                // upload to firebase
                firebaseUpload(file, "thumbnail");
                // display animation
                setUploadingThumb(true);
            } else {
                thumbFileError();
            }
        }
    }

    // on drop thumbnail file handler 
    function thumbnailDropHandler(e) {
        // prevent file opening in browser
        e.preventDefault();
        if (e.dataTransfer.items) {
            let file = e.dataTransfer.items[0].getAsFile();
            setThumbFile(file);
            // check file extension
            let ext = file.name.slice(file.name.length - 3, file.name.length).toUpperCase();
            if (ext === "JPG" || ext === "PNG") {
                // upload to firebase
                firebaseUpload(file, "thumbnail");
                // display animation
                setUploadingThumb(true);
            } else {
                thumbFileError();
            }
        }
    }

    function firebaseUpload(file, type) {
        let storageRef = app.storage().ref();
        let fileRef = storageRef.child(file.name);
        fileRef.put(file).then((e) => {
            fileRef.getDownloadURL().then(function (url) {
                if (type === "video") {
                    setVideoUrl(url);
                    setUploadingVideo(false);
                } else {
                    setThumbUrl(url);
                    setUploadingThumb(false);
                }
            });
        })
    }

    function vidFileError() {
        setUploadMessageVid("This file type is not supported");
    }

    function vidError() {
        setVideoUrl("");
        setUploadMessageVid("This file type is not supported");
    }

    function thumbFileError() {
        setUploadMessageThumb("This file type is not supported");
    }

    function thumbError() {
        setThumbUrl("");
        setUploadMessageThumb("This file type is not supported");
    }

    function titleChange(e) {
        e.preventDefault();
        setTitle(e.target.value);
    }

    function descriptionChange(e) {
        setDescription(e.target.value);
    }

    function priceChange(e) {
        if(!isNaN(e.target.value)) {
            setPrice(e.target.value);
        }
    }

    return (
        <div>
            <div id="postVideoArea">
                <div id="uploadingPostDiv">
                    <div className="uploadingAnimation" id="loadingAnimation">
                        <div className="loaderFlex">
                            <div className="loader">
                            </div>
                        </div>
                        <div className="uploadingText">
                            Posting Video
                        </div>
                    </div>
                    <div className="uploadingAnimation" id="successAnimation">
                        <div id="success" >
                            <img id="successCheck" alt="success" src="https://i.pinimg.com/originals/0f/7c/61/0f7c619d53fbe58fabce214b53530141.png"></img>
                        </div>
                        <div className="uploadingText">
                            Complete!
                        </div>
                    </div>
                </div>
                <div id="postVideoContainer">
                    <div>
                        <div id="postVideoHeader">
                            <h1>Post a Video</h1>
                        </div>
                        <div id="uploadVideoLabel">
                            Upload video
                        </div>
                        <div id="postVideoDrop" onClick={() => document.getElementById("selectVideoInput").click()} onDrop={(e) => videoDropHandler(e)} onDragOver={(e) => dragOverHandler(e)}>

                            <input style={{ "display": "none" }} id="selectVideoInput" type="file" onChange={(e) => videoSelectHandler(e)}></input>
                            {videoUrl && !uploadingVideo ?
                                (<video id="uploadPlayer" width="320" height="240" controls controlsList="nodownload nooptions nofullscreen noremoteplayback">
                                    <source src={videoUrl} type="video/mp4" onError={() => vidError()} />
                                    Your browser does not support the video tag.
                                </video>)
                                : uploadingVideo ?
                                    (
                                        <div>
                                            <div className="loaderFlex">
                                                <div className="loader">
                                                </div>
                                            </div>
                                            <div className="uploadingFileMsg">
                                                {"uploading " + videoFile.name}
                                            </div>
                                        </div>
                                    ) :
                                    <div className="uploadMessage">
                                        {uploadMessageVid}
                                    </div>
                            }
                        </div>
                        <div id="uploadThumbLabel">
                            Upload thumbnail
                        </div>
                        <div id="thumbnailDrop" onClick={() => document.getElementById("selectThumbInput").click()} onDrop={(e) => thumbnailDropHandler(e)} onDragOver={(e) => dragOverHandler(e)}>
                            <input style={{ "display": "none" }} id="selectThumbInput" type="file" onChange={(e) => thumbnailSelectHandler(e)}></input>
                            {thumbUrl && !uploadingThumb ?
                                (<img id="thumbnailPreview" src={thumbUrl} onError={() => thumbError()} alt="video thumbnail"></img>)
                                : uploadingThumb ?
                                    (
                                        <div>
                                            <div className="loaderFlex">
                                                <div className="loader">
                                                </div>
                                            </div>
                                            <div className="uploadingFileMsg">
                                                {"uploading " + thumbFile.name}
                                            </div>
                                        </div>
                                    ) :
                                    <div className="uploadMessage">
                                        {uploadMessageThumb}
                                    </div>
                            }
                        </div>

                        <div id="uploadTitleDiv">
                            <h3 className="createT">Title</h3>
                            <div id="createInputBg" style={editingTitle ? { borderColor: "rgb(95, 247, 95)" } : { borderColor: "gray" }}>
                                <input placeholder="enter a title" autoComplete="off" id="createInput2" value={title} onChange={(e) => titleChange(e)} onBlur={() => setEditingTitle(false)} onFocus={() => setEditingTitle(true)} />
                            </div>
                        </div>
                        <div id="uploadDescriptionDiv">
                            <h3 className="createT">Description</h3>
                            <div id="createInputBg" style={editingDescription ? { borderColor: "rgb(95, 247, 95)" } : { borderColor: "gray" }}>
                                <input placeholder="enter a description" autoComplete="off" id="createInput2" value={description} onChange={(e) => descriptionChange(e)} onBlur={() => setEditingDescription(false)} onFocus={() => setEditingDescription(true)} />
                            </div>
                        </div>
                        <div id="uploadDescriptionDiv">
                            <h3 className="createT">Price (optional)</h3>
                            <div id="createInputBg" style={editingPrice ? { borderColor: "rgb(95, 247, 95)" } : { borderColor: "gray" }}>
                                <input placeholder="enter a price" autoComplete="off" id="createInput2" value={price} onChange={(e) => priceChange(e)} onBlur={() => setEditingPrice(false)} onFocus={() => setEditingPrice(true)} />
                            </div>
                        </div>
                        <div id="submitPostButton2" onClick={() => submitPost()}>
                            Post
                        </div>
                        <div id="cancelButton2" onClick={() => history.push("/account")}>
                            cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}