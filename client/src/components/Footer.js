import React from "react";
import { useHistory } from "react-router-dom";
import "./styles/footerStyle.css";

export default function Footer() {
    const history = useHistory();

    return (
        <div id="footerMain">
            <div className="footerEl" onClick={() => history.push("/about")}>
                about
            </div>
            <div className="footerEl" onClick={() => history.push("/terms")}>
                terms
            </div>
            <div className="footerEl" onClick={() => window.open("https://twitter.com/venue_market", '_blank')}>
                contact
            </div>
        </div>
    );
}