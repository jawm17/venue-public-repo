import React, { useState, useContext, useEffect } from "react";
import { app } from '../../base';
import "./styles/thumnailUploadHandler.css";

export default function ThumbnailUploadHandler(props) {
    const [thumbFile, setThumbFile] = useState("");
    const [thumbUrl, setThumbUrl] = useState("");
    const [uploadingThumb, setUploadingThumb] = useState(false);
    const [uploadMessageThumb, setUploadMessageThumb] = useState("Drag and drop a file or click here");

    useEffect(() => {
        props.setThumb(thumbUrl);
    }, [thumbUrl]);

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
                setThumbUrl(url);
                setUploadingThumb(false);
            });
        })
    }


    function thumbFileError() {
        setUploadMessageThumb("This file type is not supported");
    }

    function thumbError() {
        setThumbUrl("");
        setUploadMessageThumb("This file type is not supported");
    }

    function dragOverHandler(e) {
        // Prevent default behavior (Prevent file from being opened)
        e.preventDefault();
    }

    return (
        <div id="uploadThumbArea">
            <div className="sampleThumb" onDrop={(e) => thumbnailDropHandler(e)} onDragOver={(e) => dragOverHandler(e)}>
                <input style={{ "display": "none" }} id="selectThumbInput" type="file" onClick={(e) => e.target.value = ''} onChange={(e) => thumbnailSelectHandler(e)}></input>
                {thumbUrl && !uploadingThumb ?
                    (<img id="thumbnailPreview" src={thumbUrl} onError={() => thumbError()} alt="video thumbnail"></img>)
                    : uploadingThumb ?
                        (
                            <div id="uploadInner">
                                <div>
                                    <div className="loaderFlexVid">
                                        <div className="loader">
                                        </div>
                                    </div>
                                    <div className="uploadingThumbMsg">
                                        {"uploading " + thumbFile.name}
                                    </div>
                                </div>
                            </div>
                        ) :
                        <div id="uploadInner" onClick={() => document.getElementById("selectThumbInput").click()}>
                            <div>
                                <div id="addThumbIconFlex">
                                    <svg width="32" height="32" fill="none" viewBox="0 0 24 24" id="addThumbBtn">
                                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"></path>
                                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14.25L12 5"></path>
                                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.75 8.25L12 4.75L15.25 8.25"></path>
                                    </svg>
                                </div>
                                <div className="thumbPromtText">
                                    add an image
                                </div>
                            </div>
                        </div>
                }
            </div>
            <div id="clearThumbnails" onClick={() => setThumbUrl("")}>
                clear image
            </div>
        </div>
    );
}