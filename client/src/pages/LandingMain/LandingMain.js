import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LandingHeader from "./LandingHeader";
import CompeteComponents from "./CompeteComponents";
import FAQ from "./FAQ";
import texture from "../../assets/cartographer.png";
import "./styles/landingMainStyle.css";
import playBtn from "../../assets/play-button.png";

export default function LandingMain() {
    const history = useHistory();
    const [playing, setPlaying] = useState(false);

    function playVid() {
        setPlaying(!playing);
        if (playing) {
            document.getElementById("heroVid").pause()
        } else {
            document.getElementById("heroVid").play()
        }
    }

    return (
        <div>
            <LandingHeader />
            <div id="landingHeroBg" src={texture}></div>

            <div id="landingBody">
                {/* HERO ==================================== */}
                <div id="landingHero">
                    <div id="heroFlex">
                        <div id="heroTextFlex">
                            <div id="heroTextArea">
                                <div id="heroTitle">
                                    Monetize
                                </div>
                                <div id="heroTitle">
                                    Your
                                </div>
                                <div id="heroTitle">
                                    <span id="greenText">Media</span>
                                </div>

                                <div id="heroBtn" onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSfx9jzoGSpB0A5NHVOR9gyFIx9ns3NuoW8pNkRlu-Y8hPjR1A/viewform?usp=sf_link", '_blank')}>
                                    <div id="heroBtnText">
                                        creator application
                                    </div>
                                    <svg id="heroBtnIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.75 6.75L19.25 12L13.75 17.25"></path>
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H4.75"></path>
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <div id="heroVidFlex">
                            <div id="heroVidBg1" className="heroVidBg" onClick={() => playVid()}>
                                <video id="heroVid" width="320" height="240" >
                                    <source src="https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/IMG_5735.MOV?alt=media&token=9e271c7b-b9fe-4035-a439-b2ffbd83ae26" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                {!playing ? <img src={playBtn} id="heroPlayIcon"></img> : null}
                                {/* <img id="coin1" src={coin} ></img> */}

                            </div>
                        </div>
                    </div>
                </div>
                {/* FEATURES ==================================== */}
                <div id="featuresSection">
                    <div className="sectionHeader">
                        Features
                    </div>
                    <div id="features">
                        <div className="featureFull">
                            <div className="featureInfo">
                                <div className="featureLine">
                                </div>
                                <div className="featureTitle">
                                    unlock exclusive content
                                </div>
                                <div className="featureText">
                                    Access exclusive content and premium features with just a few clicks. Enjoy a personalized experience with early access to new content and chat privileges with your favorite creators.
                                </div>
                                <div className="featureTextMini">
                                    Access exclusive content and premium features with just a few clicks.
                                </div>
                            </div>
                            <div className="featureMedia">
                                {/* <video className="featureVid" autoPlay={true} loop="true" controlsList="nodownload" muted defaultMuted playsInline>
                                    <source src={"https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/Screen%20Recording%202023-01-17%20at%204.09.59%20PM%202.mov?alt=media&token=4e1465a9-2683-4f86-9e02-d623c5418723"} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video> */}
                                <img className="featureVid" src="https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/vidGif2.gif?alt=media&token=d0283136-786e-46a1-a658-cf13880f97c5"></img>
                            </div>
                        </div>
                        <div className="featureFull" id="featureFlip">
                            <div className="featureInfo">
                                <div className="featureLine">
                                </div>
                                <div className="featureTitle">
                                    invest in creators
                                </div>
                                <div className="featureText">
                                    Support your favorite creators and invest in their success. With venue, you can easily contribute to their growth and become a valuable part of their community.
                                </div>
                                <div className="featureTextMini">
                                    Support your favorite creators and invest in their success.
                                </div>
                            </div>
                            <div className="featureMedia">
                                <img className="featureVid" src="https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/collectionPreview2.png?alt=media&token=12eb0230-316e-419a-b118-ad7a358d7370"></img>
                            </div>
                        </div>
                        <div className="featureFull">
                            <div className="featureInfo">
                                <div className="featureLine">
                                </div>
                                <div className="featureTitle">
                                    fund new projects
                                </div>
                                <div className="featureText">
                                    Support new and exciting video projects and help bring them to life. With venue, you can easily contribute to the creation of high-quality content and become a valued part of the community.
                                </div>
                                <div className="featureTextMini">
                                    Support new and exciting video projects and help bring them to life.
                                </div>
                            </div>
                            <div className="featureMedia" id="featureMediaBG">
                            <img className="featureVidMini" src="https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/fundGif.gif?alt=media&token=d0fcc2e1-65a5-4199-bcfd-cf3de2641397"></img>
                           
                            </div>
                        </div>
                    </div>
                </div>
                <div id="competeSection">
                    <div className="sectionHeader" id="competeHeader">
                        Compete to be the <mark id="greenLandingText">best</mark>
                    </div>
                    <CompeteComponents />
                </div>
                <FAQ></FAQ>
            </div>
            <div id="footerMain">
                <div className="footerEl" onClick={() => history.push("/")}>
                    about
                </div>
                <div className="footerEl" onClick={() => history.push("/terms")}>
                    terms
                </div>
                <div className="footerEl" onClick={() => window.open("https://twitter.com/venue_market", '_blank')}>
                    contact
                </div>
            </div>
        </div>
    );
}
