import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { app } from '../../base';
import { useHistory } from "react-router-dom";
// import "./createStyle.css";
// import "./createStyle2.css";

export default function CreateModal() {
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
            history.push("/home");
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
        setPrice(e.target.value);
    }

    return (
        <div id="createFlex">
            <div id="creationStation">
                <div id="createTitle">
                    create video
                </div>
                <div className="lineBr">
                </div>
                <div id="creationStationMain">
                    <div id="createVidInfo">
                        <div id="uploadTitleDiv">
                            <h3 className="createT">Title</h3>
                            <div className="createInputBg" style={editingTitle ? { borderColor: "rgb(95, 247, 95)" } : { borderColor: "gray" }}>
                                <input placeholder="enter a title" autoComplete="off" id="createInput1" value={title} onChange={(e) => titleChange(e)} onBlur={() => setEditingTitle(false)} onFocus={() => setEditingTitle(true)} />
                            </div>
                        </div>
                        <div id="uploadDescriptionDiv">
                            <h3 className="createT">Description</h3>
                            <div className="createInputBg" id="descriptionInputBg" style={editingDescription ? { borderColor: "rgb(95, 247, 95)" } : { borderColor: "gray" }}>
                                <textarea id="descriptionInput" placeholder="enter a description" autoComplete="off" value={description} onChange={(e) => descriptionChange(e)} onBlur={() => setEditingDescription(false)} onFocus={() => setEditingDescription(true)}></textarea>
                            </div>
                        </div>
                        <div id="uploadContainer1">
                            <div id="uploadTitle">
                                Upload Video
                            </div>
                            <div id="uploadArea">
                                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"></path>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14.25L12 5"></path>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 8.25L12 4.75L15.25 8.25"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div id="createAreaRight">
                        <div id="uploadContainer1">
                            <div id="uploadTitle">
                                Upload Video
                            </div>
                            <div id="uploadArea">
                                <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"></path>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14.25L12 5"></path>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 8.25L12 4.75L15.25 8.25"></path>
                                </svg>
                            </div>
                        </div>
                        
                        {/* <div id="uploadContainer2">
                            <div id="uploadTitle">
                                Upload Thumbnail
                            </div>
                            <div id="uploadArea">

                            </div>
                        </div> */}
                    </div>
                </div>
                <div id="createBtnsBottom">
                    <div className="createBtn" id="cancelCreate">
                        cancel
                    </div>
                    <div className="createBtn">
                        next
                    </div>
                </div>
            </div>
        </div>
    );
}