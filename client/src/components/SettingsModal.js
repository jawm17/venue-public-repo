import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./styles/settingsModalStyle.css";

export default function SettingsModal(props) {
    const { user } = useContext(AuthContext);
    const [editBio, setEditBio] = useState(false);
    const [bio, setBio] = useState(props.bio || "");
    const [name, setName] = useState(props.name || "");
    const [email, setEmail] = useState(props.email || "");
    const [checking, setChecking] = useState(false);

    const [nameBorder, setNameBorder] = useState("transparent");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "scroll";
    }, []);

    useEffect(() => {
        setChecking(true);
        const timeOutId = setTimeout(() => checkUsername(), 500);
        return () => clearTimeout(timeOutId);
    }, [name]);

    async function checkUsername() {
        try {
            const res = await axios.post("/user/check-username", { name });
            if (res.data?.exists) {
  
                if(name !== props.name) {
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

    async function save() {
        if(!checking && nameBorder !== "red") {
            try {
                const res = await axios.post("/user/update-info", { name, bio, email });
      
                props.updateStats();
                props.close();
            } catch (error) {

                props.close();
            }
        } else {
            // error
        }
    }

    return (
        <div id="settingsOuter">
            <div id="settingsModal">
                <div id="settingsTitle">
                    Settings
                </div>
                <svg onClick={() => props.close()} id="closeSettings" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                </svg>

                <div id="editBioArea">
                    <div id="bioTitle">
                        edit username
                    </div>
                    <div id="bioInputBg" style={{borderColor: nameBorder}}>
                        <input autoComplete="off" id="bioInput" placeholder="create a name for yourself" onChange={(e) => setName(e.target.value)} value={name} onBlur={nameBorder === "red" ? null : () => setNameBorder("transparent")} onFocus={nameBorder === "red" ? null : () => setNameBorder("rgb(95, 247, 95)")}></input>
                    </div>
                </div>

                <div id="editBioArea">
                    <div id="bioTitle">
                        edit bio
                    </div>
                    <div id="bioInputBg" style={editBio ? { borderColor: "rgb(95, 247, 95)" } : { borderColor: "transparent" }}>
                        <input autoComplete="off" id="bioInput" placeholder="type something about yourself" onChange={(e) => setBio(e.target.value)} value={bio} onBlur={() => setEditBio(false)} onFocus={() => setEditBio(true)}></input>
                    </div>
                </div>

                <div id="saveSettings" onClick={() => save()}>
                    save
                </div>
            </div>
        </div>
    );
}