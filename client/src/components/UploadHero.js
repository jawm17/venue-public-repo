import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { app } from '../base';
import "./styles/uploadComponentStyle.css";

export default function UploadHero(props) {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
    const [url, setUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    // on click select video file handler
    function fileSelected(e) {
        setUploading(true);
        if (e.target.files[0]) {
            let file = e.target.files[0];
            // upload to firebase
            firebaseUpload(file);
        }
    }

    function firebaseUpload(file) {
        let storageRef = app.storage().ref();
        let fileRef = storageRef.child(file.name);
        fileRef.put(file).then((e) => {
            fileRef.getDownloadURL().then(function (url) {
                setUrl(url);
            });
        })
    }

    async function uploadImage() {
        try {
            await axios.post("/user/update-hero", { heroImg: url });
            props.refresh();
            setUploading(false);
        } catch (error) {
            alert("error occurred");
            setUser(null);
            setIsAuthenticated(false);
        }
    }

    return (
        <div id="uploadComponentBtn" onClick={() => document.getElementById("selectFileInput").click()}>
            {
                uploading ? <div id="heroLoader">
                    <div className="loader">
                    </div>
                </div>
                    :
                    <svg xmlns="https://www.w3.org/2000/svg" id="editHeroImgBtn" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            }
            <input style={{ "display": "none" }} accept="image/png, image/gif, image/jpeg" id="selectFileInput" type="file" onChange={(e) => fileSelected(e)}></input>
            {url ? <img
                style={{ display: 'none' }}
                src={url}
                onLoad={() => uploadImage()}
                onError={() => alert("error occurred")}
            /> : null}
        </div>
    );
}