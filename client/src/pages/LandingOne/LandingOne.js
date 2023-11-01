import React, { useEffect, useState } from "react";
// import {$,jQuery} from 'jquery';
// export for others scripts to use
import LandingHeader from "./LandingHeader";
import { useHistory } from "react-router-dom";
import sample from "./sample1.png";
import stars from "./stars.png";
import sampleSmall from "./sampleSmall.png";
// import "./landingStyleOne.css";

export default function LandingOne() {
    const history = useHistory();
    const [smallScreen, setSmallScreen] = useState(false);
    const [clickableCover, setClickableCover] = useState({ x: 0, y: 0 });

    useEffect(() => {
        checkWindowWidth();
        let x = document.getElementById("landingConnect").getBoundingClientRect().left;
        let y = document.getElementById("landingConnect").getBoundingClientRect().top;
        setClickableCover({ x: x, y: y });
        window.addEventListener("resize", function () {
            checkWindowWidth();
        });
        //  ================ REMOVE EVENT LISTENER ============================================
    }, []);

    function checkWindowWidth() {
        let x = document.getElementById("landingConnect").getBoundingClientRect().left;
        let y = document.getElementById("landingConnect").getBoundingClientRect().top;
        setClickableCover({ x: x, y: y });
        if (window.innerWidth < 900) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }

    useEffect(() => {
        let topReached = 0

        document.getElementById("landingInfoArea").addEventListener("scroll", () => {
            let blackBlock = document.getElementById("bigBlackBlock").getBoundingClientRect();
            if (blackBlock.y > 105) {
                // document.getElementById("bigBlackBlock").style.transform = "scale(1.08)";
                document.getElementById("bigBlackBlock").style.position = "fixed";
                document.getElementById("bigBlackBlock").style.top = (window.innerHeight - document.getElementById("landingInfoArea").scrollTop - 250) + "px";
            } else if (topReached === 0) {
                topReached = (document.getElementById("landingInfoArea").scrollTop);
                document.getElementById("bigBlackBlock").style.top = "105px";
            } else if (document.getElementById("landingInfoArea").scrollTop > topReached + 400) {
                document.getElementById("bigBlackBlock").style.top = ((window.innerHeight - document.getElementById("landingInfoArea").scrollTop - 250) + 400) + "px";
            } else if (topReached > 0 && document.getElementById("landingInfoArea").scrollTop < topReached) {
                document.getElementById("bigBlackBlock").style.top = (window.innerHeight - document.getElementById("landingInfoArea").scrollTop - 250) + "px";
            }
            if (blackBlock.y > window.innerHeight - 200) {
                document.getElementById("bigBlackBlock").style.transform = "scale(1)";
            }
    

            if (blackBlock.y < ((window.innerHeight / 2) - 10)) {
                document.getElementById("landingTextFlex").style.opacity = "0"
                document.getElementById("clickableCover").style.display = "none"
            } else if (blackBlock.y > ((window.innerHeight / 2) - 150)) {
                document.getElementById("landingTextFlex").style.opacity = "100"
                document.getElementById("clickableCover").style.display = "initial"
            }

        })
    }, []);

    return (
        <div>
            <div id="clickableCover" style={{ "left": clickableCover.x, "top": clickableCover.y }} onClick={() => history.push("/home")}>
            </div>
            <div id="landingPage-container">
                <div id="landingBg">
                </div>
                <LandingHeader />
                <div id="landingTextFlex">
                    <div>
                        <div id="landingMainTextFlex">
                            <div id="landingMainText">
                                <div>Monetize</div> <div>Your</div> <div id="accentedText">Media</div>
                            </div>
                        </div>
                        <div id="landingSubText">
                            unlock the future
                        </div>
                        <div id="midFlex">
                            <div id="landingConnect">
                                open app
                            </div>
                        </div>
                    </div>
                </div>
                <div id="landingInfoArea">
                    <div id="landingInfoInner">
                        <div id="lowerInfo">

                            <div className="infoBlock">
                                <div className="leftInfo">
                                    <div className="leftInfoInner">
                                        <div className="infoTitle">
                                            Paywalls
                                        </div>
                                        <div className="infoParagraph">
                                            Paywalls allow creators to monetize their videos directly by setting a price for fans to view
                                            their content. Simply select the amount you would like to charge and start accepting payments on polygon or ethereum mainnet.
                                        </div>
                                    </div>
                                </div>
                                <div className="rightInfo">
                                    <video autoPlay={true} id="smallVideoLanding" loop="true" controlsList="nodownload" muted defaultMuted playsInline>
                                        <source src={"https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/Screen%20Recording%202023-01-17%20at%204.09.59%20PM%202.mov?alt=media&token=4e1465a9-2683-4f86-9e02-d623c5418723"} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    {/* <img className="infoImg" src="https://media.istockphoto.com/id/1124602773/photo/abstract-blurred-gradient-background-in-bright-colorful-smooth-illustration.jpg?b=1&s=170667a&w=0&k=20&c=QsDU7VzQlhP2AiVla8YFdKIV7YviSst24x94dBJeXfA="></img> */}
                                </div>
                            </div>


                            <div className="infoBlock" id="invertedBlock">
                                <div className="leftInfo">
                                    <img className="infoImg" src="https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/nftgate.png?alt=media&token=82113ff7-4a76-4f63-a46e-e97a63552d00"></img>
                                </div>
                                <div className="rightInfo">
                                    <div className="leftInfoInner">
                                        <div className="infoTitle">
                                            Token Gated Content
                                        </div>
                                        <div className="infoParagraph">
                                            Allow your NFT holders to access your content and build a community around your art.
                                            Just choose an NFT from your wallet or import a custom contract from polygon or ethereum mainnet.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="infoBlock" id="normalBlock">
                                <div className="leftInfo">
                                    <div className="leftInfoInner">
                                        <div className="infoTitle">
                                            Token Gated Content
                                        </div>
                                        <div className="infoParagraph">
                                            Allow your NFT holders to access your content and build a community around your art.
                                            Just choose an NFT from your wallet or import a custom contract from polygon or ethereum mainnet.
                                        </div>
                                    </div>
                                </div>
                                <div className="rightInfo">
                                    <img className="infoImg" src="https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/nftgate.png?alt=media&token=82113ff7-4a76-4f63-a46e-e97a63552d00"></img>
                                </div>
                            </div>


                            <div className="infoBlock">
                                <div className="leftInfo">
                                    <div className="leftInfoInner">
                                        <div className="infoTitle">
                                            NFT Subscriptions
                                        </div>
                                        <div className="soonTag">
                                            <img src={stars} className="soonStars"></img>
                                            <div>
                                                coming soon
                                            </div>
                                        </div>
                                        <div className="infoParagraph">
                                            Subscription NFTs grant fans access to your content for a set amount of time.
                                            Bring greater utility to your existing NFTs by using them as subscription tokens.
                                        </div>
                                    </div>
                                </div>


                                <div className="rightInfo">
                                    <img className="infoImg" src="https://firebasestorage.googleapis.com/v0/b/weij-c2efd.appspot.com/o/Wrap%20Capture%20(2).png?alt=media&token=2184b0ea-5fad-44cc-bfee-b6845fab5ec7"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="landingFooter">
                        <div onClick={() => window.location.reload()}>
                            about
                        </div>
                        <div onClick={() => window.open("/terms")}>
                            terms
                        </div>
                        <div onClick={() => window.open("https://twitter.com/venue_market", '_blank')}>
                            contact
                        </div>
                    </div>
                </div>
                <div id="bigBlackBlock">
                    <img src={smallScreen ? sampleSmall : sample} id="heroImgLanding"></img>
                    {/* <video autoPlay={true} id="mediaPlayerLanding" controls controlsList="nodownload" muted>
                <source src={movie} type="video/mp4" />
                        Your browser does not support the video tag.
            </video> */}
                </div>
            </div>
        </div>
    );
}