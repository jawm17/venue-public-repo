import React, { useEffect } from "react";
import "./styles/competeComponentsStyle.css";

export default function CompeteComponents() {

    let supporters = "https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/topSupportersDemo2.png?alt=media&token=12c451e2-c3a6-47c7-8ce2-a72f3e1ff8f1";
    let leaders = "https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/leaderboardDemo6.png?alt=media&token=b5ca921a-7c7c-4386-8854-1084f360c107";
    let tippers = "https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/topTippersDemo4.png?alt=media&token=7e60d8f9-63a7-4c57-84eb-494c780e9d6f";


    // useEffect(() => {
    //     if(window.innerWidth > 819) {
    //         for(let i = 1; i < 4; i++) {
    //             openPanel("compete" + i);
    //         }
    //     }
    // }, []);

    function openPanel(panelId) {
        // document.getElementById(panelId + "Img").style.display = "initial";
        // document.getElementById(panelId + "Text").style.display = "block";
        // setTimeout(() => {
        //     document.getElementById(panelId + "Img").style.opacity = "100%";
        //     document.getElementById(panelId + "Text").style.transition = "all 0.2s ease-in";
        //     document.getElementById(panelId + "Text").style.opacity = "100%";
        // }, 200);
    }

    function closePanel(panelId) {
        // document.getElementById(panelId + "Img").style.opacity = "0%";
        // document.getElementById(panelId + "Text").style.opacity = "0%";
        // document.getElementById(panelId + "Text").style.transition = "none";
        // setTimeout(() => {
        //     document.getElementById(panelId + "Img").style.display = "none";
        //     document.getElementById(panelId + "Text").style.display = "none";
        // }, 200);
    }

    return (
        <>
            <h1 className="LsectionTitle">compete to be the <mark>best</mark></h1>
            <div id="competePanelArea">
                        <div className="competePanel" onMouseLeave={() => closePanel("compete1")} onMouseEnter={() => openPanel("compete1")}>
                            <img id="compete1Img" className="competeImg" src={supporters}></img>
                            <p className="competeDescription" id="compete1Text">
                                Fans who spend the most money on a creator are shown on the creator's profile
                            </p>
                            <div className="competePanelTop">
                                <svg xmlns="https://www.w3.org/2000/svg" className="competeIcon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                                </svg>
                                <h3 className="competeName">
                                    Top Supporters
                                </h3>
                            </div>
                        </div>
                        <div className="competePanel" onMouseLeave={() => closePanel("compete2")} onMouseEnter={() => openPanel("compete2")}>
                            <img id="compete2Img" className="competeImg" src={leaders}></img>
                            <p className="competeDescription" id="compete2Text">
                                Top earning creators get a spot on the top earning leaderboard
                            </p>
                            <div className="competePanelTop">
                                <svg xmlns="https://www.w3.org/2000/svg" className="competeIcon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="competeName">
                                    Top Earning
                                </h3>
                            </div>
                        </div>
                        <div className="competePanel" onMouseLeave={() => closePanel("compete3")} onMouseEnter={() => openPanel("compete3")}>
                            <img id="compete3Img" className="competeImg" src={tippers}></img>
                            <p className="competeDescription" id="compete3Text">
                                Fans who send the biggest tips get their name displayed below each video
                            </p>
                            <div className="competePanelTop">
                                <svg xmlns="https://www.w3.org/2000/svg" className="competeIcon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <h3 className="competeName">
                                    Top Tippers
                                </h3>
                            </div>
                        </div>
                        </div>
                </>
    );
}