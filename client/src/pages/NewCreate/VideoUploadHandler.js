import React, { useState, useContext, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { app } from '../../base';
import "./styles/videoUploadStyle.css";

export default function VideoUploadHandler(props) {
    const [videoFile, setVideoFile] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [uploadMessageVid, setUploadMessageVid] = useState("drop a file or click here");
    const [percentUploaded, setPercentUploaded] = useState(0);

    useEffect(() => {
        props.setVid(videoUrl);
    }, [videoUrl]);

    function dragOverHandler(e) {
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
    }

    // on click select video file handler
    function videoSelectHandler(e) {
        console.log("here")
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

    function firebaseUpload(file, type) {
        let storageRef = app.storage().ref();
        const fileRef = storageRef.child(file.name);
        const uploadTask = fileRef.put(file);

        uploadTask.on('state_changed', function (snapshot) {
            // Get the progress percentage
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setPercentUploaded(progress);
        }, function (error) {
            console.log('Upload failed: ', error);
        }, function () {
            // Upload completed successfully
            fileRef.getDownloadURL().then(function (url) {
                if (type === "video") {
                    setVideoUrl(url);
                    setUploadingVideo(false);
                }
            });
        });

        // let storageRef = app.storage().ref();
        // let fileRef = storageRef.child(file.name);
        // fileRef.put(file).then((e) => {
        //     console.log(e);
        //     fileRef.getDownloadURL().then(function (url) {
        //         if (type === "video") {
        //             setVideoUrl(url);
        //             setUploadingVideo(false);
        //         }
        //     });
        // })
    }

    function vidFileError() {
        setUploadMessageVid("This file type is not supported");
    }

    function vidError() {
        setVideoUrl("");
        setUploadMessageVid("This file type is not supported");
    }

    function resetUpload() {
        setVideoUrl("")
        setVideoFile("")
    }

    return (
        <div id="postVideoDrop" onDrop={(e) => videoDropHandler(e)} onDragOver={(e) => dragOverHandler(e)}>
            <input style={{ "display": "none" }} id="selectVideoInput" type="file" onClick={(e) => e.target.value = ''} onChange={(e) => videoSelectHandler(e)}></input>
            {videoUrl && !uploadingVideo ?
                (<video id="uploadPlayer" width="320" height="240" controls controlsList="nodownload nooptions nofullscreen noremoteplayback">
                    <source src={videoUrl} type="video/mp4" onError={() => vidError()} />
                    Your browser does not support the video tag.
                </video>)
                : uploadingVideo ?
                    (
                        <div id="uploadInner">
                            <div>
                                <div className="loaderFlexVid">
                                    <div className="loader">
                                    </div>
                                </div>
                                <div className="uploadingFileMsg">
                                    {"uploading " + videoFile.name}
                                </div>
                            </div>
                            <div id="progressBarContainer">
                                <ProgressBar completed={percentUploaded} customLabel=" " bgColor="var(--green)" baseBgColor="#2b3136" />
                            </div>
                        </div>
                    ) :
                    <div id="uploadInner" onClick={() => document.getElementById("selectVideoInput").click()}>
                        <div>
                            <svg width="45" height="45" fill="none" viewBox="0 0 24 24" id="uploadIcon">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"></path>
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14.25L12 5"></path>
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 8.25L12 4.75L15.25 8.25"></path>
                            </svg>
                            <div className="uploadMessage">
                                {uploadMessageVid}
                            </div>
                        </div>
                    </div>
            }
            <div id="deleteUploadBtn" onClick={() => resetUpload()}>
                <div className="iconFlex">
                    <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 7.75L7.59115 17.4233C7.68102 18.4568 8.54622 19.25 9.58363 19.25H14.4164C15.4538 19.25 16.319 18.4568 16.4088 17.4233L17.25 7.75"></path>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 7.5V6.75C9.75 5.64543 10.6454 4.75 11.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7.5"></path>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 7.75H19"></path>
                    </svg>
                    <div id="deleteUploadText">
                        delete
                    </div>
                </div>
            </div>
        </div>
    );
}