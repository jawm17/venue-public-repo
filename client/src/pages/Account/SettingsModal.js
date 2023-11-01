import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import UploadProfile from "../../components/UploadProfile";
import UploadHero from "../../components/UploadHero";
import "./styles/settingsModalStyle.css";

export default function SettingsModal(props) {
    const { getUser } = useContext(AuthContext);
    const [editBio, setEditBio] = useState(false);
    const [bio, setBio] = useState(props.user.bio || "");
    const [name, setName] = useState(props.user.username || "");
    const [checking, setChecking] = useState(false);
    const [nameBorder, setNameBorder] = useState("transparent");

    useEffect(() => {
        setChecking(true);
        const timeOutId = setTimeout(() => checkUsername(), 500);
        return () => clearTimeout(timeOutId);
    }, [name]);

    async function checkUsername() {
        try {
            const res = await axios.post("/user/check-username", { name });
            if (res.data?.exists) {
                if (name !== props.name && name !== props.user.username) {
                    setNameBorder("red");
                } else {
                    setNameBorder("rgb(95, 247, 95)")
                }
            } else {
                setNameBorder("rgb(95, 247, 95)")
            }
            setChecking(false);
        } catch (error) {

        }
    }

    async function saveSettings() {
        if (!checking && nameBorder !== "red") {
            if (name) {
                try {
                    const res = await axios.post("/user/update-info", { name, bio });
                    props.saveChanges();
                } catch (error) {
     
                    alert("error occurred")
                    // props.close();
                }
            }
        } else {
            alert("username taken")
        }
    }

    function nameInput(event) {
        const valueWithoutSpaces = event.target.value.replace(/\s/g, ''); // Remove spaces from input value
        setName(valueWithoutSpaces);
    };

    return (
        <div id="settingsBg">
            {/* <div id="cancelSpace" onClick={() => props.close()}>
            </div> */}
            <div id="settingsModal">
                <svg onClick={() => props.close()} id="closeSettings" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <img id="sampleHero" src={props.user?.heroImg || "https://wallpaperaccess.com/full/3643882.jpg"}></img>
                <div id="settingsHeroHover">
                    <UploadHero refresh={() => getUser()} />
                </div>
                <div id="settingsProfileImgFlex">
                    <img id="settingsProfileImg" src={props.user?.profileImg}></img>
                    <div id="settingsProfileImgHover">
                        <UploadProfile refresh={() => getUser()} />
                    </div>
                </div>

                <div id="settingsInner">
                    <div className="settingsInputTitle">
                        username
                    </div>
                    <div className="settingsInputBg" style={{ borderColor: nameBorder }}>
                        <input autoComplete="off" className="settingsInput" placeholder="create a name for yourself" maxlength={15} onChange={(e) => nameInput(e)} value={name} onBlur={nameBorder === "red" ? null : () => setNameBorder("transparent")} onFocus={nameBorder === "red" ? null : () => setNameBorder("rgb(95, 247, 95)")}></input>
                    </div>
                    {nameBorder === "red" ?
                        <div id="usernameError">
                            username taken
                        </div>
                        :
                        null
                    }
                    <div className="settingsInputTitle">
                        bio
                    </div>
                    <div className="settingsInputBg" style={editBio ? { borderColor: "rgb(95, 247, 95)" } : { borderColor: "transparent" }}>
                        <input autoComplete="off" className="settingsInput" placeholder="type something about yourself" maxlength={130} onChange={(e) => setBio(e.target.value)} value={bio} onBlur={() => setEditBio(false)} onFocus={() => setEditBio(true)}></input>
                    </div>
                </div>

                <div id="submitSettingsBtn" onClick={() => saveSettings()}>
                    save
                </div>

            </div>
        </div>
    );
}