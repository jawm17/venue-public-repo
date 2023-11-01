import React, { useState } from "react";
import "./styles/FAQStyle.css";

export default function FAQ() {
    const [openAnswer, setOpenAnswer] = useState(false);

    function revealAnswer(panelId) {
        setOpenAnswer(panelId);
        document.getElementById("faq" + panelId).style.height = "200px";
    }

    return (
        <div id="faqSection">
            <div className="sectionHeader">
                FAQs
            </div>
            <div className="faqArea">
            <div className="faqBtn"  onClick={openAnswer === 3 ? () => setOpenAnswer(null) : () => setOpenAnswer(3)}>
                    <div className="faqTop">
                        <div>
                            what is venue?
                        </div>
                        <div>
                            {openAnswer === 3 ? "-" : "+"}
                        </div>
                    </div>
                    <div className="faqAnswer" style={openAnswer === 3 ? {display : "block"} : {display : "none"}}>
                        venue is a video paywall platform where creators earn money directly from their fans. Creators on venue keep 86% of their earnings. 
                    </div>
                </div>
                <div className="faqBtn"  onClick={openAnswer === 2 ? () => setOpenAnswer(null) : () => setOpenAnswer(2)}>
                    <div className="faqTop">
                        <div>
                            how do I unlock content?
                        </div>
                        <div>
                            {openAnswer === 2 ? "-" : "+"}
                        </div>
                    </div>
                    <div className="faqAnswer" style={openAnswer === 2 ? {display : "block"} : {display : "none"}}>
                        Simply create an account, purchase credits, and then unlock videos or tip your favorite creators.
                    </div>
                </div>
                <div className="faqBtn"  onClick={openAnswer === 1 ? () => setOpenAnswer(null) : () => setOpenAnswer(1)}>
                    <div className="faqTop">
                        <div>
                            how do payments work?
                        </div>
                        <div>
                            {openAnswer === 1 ? "-" : "+"}
                        </div>
                    </div>
                    <div className="faqAnswer" style={openAnswer === 1 ? {display : "block"} : {display : "none"}}>
                        Payments are on the polygon blockchain. All payments are instant and the creator recives 86% of their earnings.
                    </div>
                </div>
                 <div className="faqBtn"  onClick={openAnswer === 4 ? () => setOpenAnswer(null) : () => setOpenAnswer(4)}>
                    <div className="faqTop">
                        <div>
                            how can I become a creator?
                        </div>
                        <div>
                            {openAnswer === 4 ? "-" : "+"}
                        </div>
                    </div>
                    <div className="faqAnswer" style={openAnswer === 4 ? {display : "block"} : {display : "none"}}>
                        In order to start earning money on venue, users must first apply to be a creator.
                    </div>
                </div>
            </div>
        </div>
    );
}