import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LandingHeader from "./LandingHeader";
import CompeteComponents from "./CompeteComponents";
import FooterLanding from "./FooterLanding";
import texture from "../../assets/cartographer.png";
import BG from "./styles/test";
// import "./styles/landingStyle.css";
import orb5 from "../../assets/orb5.png";
import PromoTiles from "../Promo/PromoTiles";
import playBtn from "../../assets/play-button.png";
import polyLogo from "../../assets/polygon.png";
import coin from "../../assets/coin.png";

export default function Landing() {
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

                                <div id="heroBtn" onClick={() => history.push("/home")}>
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
                {/* features */}
                <div className="landingSections" id="featuresContainer">
                    <h1 className="LsectionTitle">Features</h1>
                    {/* <h2 className="LsectionSubtilte">support your favorite artist</h2> */}
                    <div className="landingGridDivs">
                        <div className="landingGridInfo">
                            <div id="framerDiv"></div>
                            <div>
                                <h3>unlock exclusive content</h3>
                                <p>
                                    Access exclusive content and premium features with just a few clicks. Enjoy a personalized experience with early access to new content and chat privileges with your favorite creators.
                                </p>
                            </div>
                        </div>
                        <div className="divImgs">
                            <video autoPlay={true} loop="true" controlsList="nodownload" muted defaultMuted playsInline>
                                <source src={"https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/Screen%20Recording%202023-01-17%20at%204.09.59%20PM%202.mov?alt=media&token=4e1465a9-2683-4f86-9e02-d623c5418723"} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className="landingGridDivs" id="flip">
                        <div className="divImgs">
                            <img src="https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/collectionPreview2.png?alt=media&token=12eb0230-316e-419a-b118-ad7a358d7370"></img>
                        </div>
                        <div className="landingGridInfo">
                            <div id="framerDiv"></div>
                            <div>
                                <h3>invest in creators</h3>
                                <p>
                                    Support your favorite creators and invest in their success. With venue, you can easily contribute to their growth and become a valuable part of their community.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="landingGridDivs">
                        <div className="landingGridInfo">
                            <div id="framerDiv"></div>
                            <div>

                                <h3>fund new projects</h3>
                                <p>
                                    Support new and exciting video projects and help bring them to life. With venue, you can easily contribute to the creation of high-quality content and become a valued part of the community.
                                </p>
                            </div>
                        </div>
                        <div id="fundBg">
                            {/* <video autoPlay={true} loop="true" controlsList="nodownload" muted defaultMuted playsInline>
                                <source src={"https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/Screen%20Recording%202023-01-17%20at%2011.51.44%20PM%20(3)%202.mov?alt=media&token=1dc68b53-1bf0-40dd-8be2-6382a2e1ab48"} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video> */}
                        </div>
                    </div>
                </div>
                {/* the best */}
                <div className="landingSections" id="landingTheBest">
                    <CompeteComponents />
                </div>
                {/* unlock */}
                <div className="landingSections" id="unlockFuture">
                    <h1 className="LsectionTitle">explore the future</h1>
                    {/* <h2 className="LsectionSubtilte">The path to start your journey lies ahead.</h2> */}
                    {/* buy credits */}
                    <div id="unlockFutureContent">
                        <div className="landingGridDivs" id="flip">
                            <div className="stepNumbersDiv1" id="stepDivID"><h5>1</h5><p></p><div className="stepLines"></div></div>
                            <div>
                                <div id="techImg1">
                                    <img src="https://imgs.search.brave.com/vwPiY5Ee5rcdeiR7sNwcccu8xpYbMg84hsdRL4GD2qU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly91cGxv/YWRzLXNzbC53ZWJm/bG93LmNvbS81YmIy/MDEyMWNhMmU5NmVl/MDFkYjI5YmMvNWJj/OWM1ZWRmZjNiZWQw/NmUwN2I1YjY0X0VU/SC5naWY.gif"></img>
                                </div>
                            </div>
                            <div className="landingGridInfo">
                                <div>
                                    <h3>Create an Account</h3>
                                    <p>Buy an ethereal NFT with your credit card. Fund your account through a seamless and secure transaction process.</p>
                                </div>
                            </div>

                        </div>
                        <div className="landingGridDivs">
                            <div className="stepNumbersDiv1"><h5>2</h5><p></p><div className="stepLines"></div></div>
                            <div className="landingGridInfo">
                                <div>
                                    <h3>Buy Credits</h3>
                                    <p>Using your ethereal card you can unlock and access exclusive content while supporting your favorite artists.</p>
                                </div>
                            </div>
                            <div>
                                <video autoPlay={true} loop="true" controlsList="nodownload" muted defaultMuted playsInline>
                                    <source src={'https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/Screen%20Recording%202023-01-28%20at%208.12.26%20PM%202.mov?alt=media&token=d8ba7f08-4f5b-4d3f-8d9d-372ab5d7af29'} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                        </div>
                        <div className="landingGridDivs" id="flip">
                            <div className="stepNumbersDiv1"><h5>3</h5><p></p><div className="stepLines" id="thirdLine"></div></div>
                            <div>
                                <div id="techImg1">
                                    <img src="https://imgs.search.brave.com/vwPiY5Ee5rcdeiR7sNwcccu8xpYbMg84hsdRL4GD2qU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly91cGxv/YWRzLXNzbC53ZWJm/bG93LmNvbS81YmIy/MDEyMWNhMmU5NmVl/MDFkYjI5YmMvNWJj/OWM1ZWRmZjNiZWQw/NmUwN2I1YjY0X0VU/SC5naWY.gif"></img>
                                </div>
                            </div>
                            <div className="landingGridInfo">
                                <div>
                                    <h3>Unlock Content</h3>
                                    <p>Using blockchain technology, the money is sent directly to the creator. This allows for transparent payments and a direct fan to artist relationship.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <footer className="landingSections">
                <FooterLanding />
            </footer>
        </div>
    );
}
