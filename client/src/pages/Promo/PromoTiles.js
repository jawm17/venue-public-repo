import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LandingHeader from "../Landing/LandingHeader";
import "./promoTilesStyle.css";

export default function PromoTiles() {
    const history = useHistory();

    useEffect(() => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const numCols = Math.ceil(windowWidth / 112);
        const numRows = Math.ceil(windowHeight / 22.4);
        generateTextBg(numCols, numRows, windowWidth);
        // window.addEventListener("scroll", (e) => scrollAnimation(e, numCols, numRows));
        // return () => window.removeEventListener("scroll", scrollAnimation);
    }, [])

    function scrollAnimation(e, numCols, numRows) {
        // let offset = window.pageYOffset
        // if (offset > 50) {
        //     let venue = document.getElementsByClassName("spanItemGreen");
        //     venue[0].textContent = "venue";
        //     venue[0].classList.remove("spanItemGreen");

        //     let white = document.getElementsByClassName("spanItemWhite");
        //     const textToSpell = ["monetize", "your", "media"];


        //     for (let i = 0; i < textToSpell.length; i++) {
        //         white[0].textContent = "venue";
        //         white[0].classList.remove("spanItemWhite");
        //     }

        //     setTimeout(() => {
        //         const item = document.getElementById(`r${(numRows / 2) + 4}c${3}`);
        //         item.textContent = "venue"
        //         item.classList.add('spanItemGreen');
        //     }, 1000);


        // } else {
        //     document.getElementById("promoTilesBg").style.opacity = 100;
        // }
        // for (let row = 0; row < numRows; row++) {
        //     let item = document.getElementById(`r${row}c0`);
        //     let offset = window.pageYOffset + window.pageYOffset * 2;
        //     if(row % 2 === 0) {
        //         item.style.marginLeft = offset  + "px"
        //     } else {
        //         item.style.marginLeft = "-" + offset + "px"
        //     }
        // }
    }

    function showFeatures() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const numCols = Math.ceil(windowWidth / 112);
        const numRows = Math.ceil(windowHeight / 22.4);

        let venue = document.getElementsByClassName("spanItemGreen");
        venue[0].textContent = "venue";
        venue[0].classList.remove("spanItemGreen");

        let white = document.getElementsByClassName("spanItemWhite");
        const textToSpell = ["monetize", "your", "media"];


        for (let i = 0; i < textToSpell.length; i++) {
            white[0].textContent = "venue";
            white[0].classList.remove("spanItemWhite");
        }

        const item = document.getElementById(`r${(numRows / 2) - 7}c${3}`);
        item.textContent = "features"
        item.classList.add('spanItemGreen');

        document.getElementById("testFeatures").style.display = "flex"
    }

    function generateTextBg(numCols, numRows, windowWidth) {
        // Generate Text Bg
        const body = document.getElementById('promoTilesBg');
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const spanElement = document.createElement('span');
                spanElement.textContent = 'venue';
                spanElement.classList.add('spanItem');
                spanElement.id = `r${row}c${col}`;
                body.appendChild(spanElement);
            }
            body.appendChild(document.createElement('br'));
        }

        let i = 0;
        setInterval(() => {
            if (i < numRows / 2) {
                // generate green text tiles
                const randomRow = i
                const randomCol = windowWidth > 1000 ? 3 : 1;
                const startingCol = windowWidth > 1000 ? 3 : 1;
                const randomText = document.getElementById(`r${randomRow}c${startingCol}`);
                randomText.classList.add('spanItemGreen');

                // set removeText to false if on the last item
                let removeText = i >= (numRows / 2) - 1 ? false : true;
                // remove trailing green text tiles
                setTimeout(() => {
                    const prevRandomText = document.getElementsByClassName("spanItemGreen");
                    if (prevRandomText.length > 0 && removeText) {
                        prevRandomText[0].classList.remove('spanItemGreen');
                    }
                }, 300);

                const textToSpell = ["monetize", "your", "media"];
                // generate text to spell
                
                if (removeText === false) {
                    for (let K = 0; K < textToSpell.length; K++) {
                        let startingRow = windowWidth > 1000 ? 0 : K;
                        let whiteStartingCol = windowWidth > 1000 ? K + startingCol : startingCol;
                        const item = document.getElementById(`r${(numRows / 2) + startingRow}c${whiteStartingCol}`);
                        item.textContent = textToSpell[K]
                        item.classList.add('spanItemWhite');
                   
                        if (K > 0 && windowWidth > 1000) {
                            console.log("here")
                            const spanElement = document.createElement('span');
                            spanElement.textContent = 'v';
                            spanElement.classList.add('spanItem');
                            item.prepend(spanElement);
                        }
                    }
                }
                i++
            }
        }, 10);
    }

    return (
        <div id="promoPage">
            <div id="headerCenter">
                <LandingHeader />
            </div>
            <div id="promoTilesBg">
                <div id="testFeatures">
                    <div className="testFeat">

                    </div>
                    <div className="testFeat">

                    </div>
                    <div className="testFeat">

                    </div>
                </div>
            </div>
            {/* <div id="promoBlock">
            </div> */}
        </div>
    );
}