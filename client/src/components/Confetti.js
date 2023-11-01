import React, { useEffect } from "react";
const confetti = require('canvas-confetti');

export default function Confetti(props) {
    var myConfetti = confetti.create(document.getElementById("confettiCanvas"), { resize: true });
    var colors = ['#bb0000', '#ffffff'];

    var duration = 500 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 40, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    useEffect(() => {
        let varX;
        let varY;
        if (props.element) {
            let unlockBtn = document.getElementById(props.element).getBoundingClientRect();
            varX = (unlockBtn.width / 2) / window.innerWidth;
            varY = (unlockBtn.height / 2) / window.innerHeight;
        } else {
            varX = 0.5;
            varY = 0.5;
        }

        // var interval = setInterval(function () {
        //     var timeLeft = animationEnd - Date.now();
        //     if (timeLeft <= 0) {
        //         return clearInterval(interval);
        //     }
        //     var particleCount = 50 * (timeLeft / duration);
        //     myConfetti(Object.assign({}, defaults, { zIndex: 1000, particleCount, origin: { x: varX, y: varY } }));
        // }, 250);

        setTimeout(() => {
            var timeLeft = animationEnd - Date.now();
            var particleCount = 50 * (timeLeft / duration);
            myConfetti(Object.assign({}, defaults, { zIndex: 40000, particleCount: 100, origin: { x: varX, y: varY } }));
        }, 0);
    }, []);

    return (
        <div>
            <canvas id="confettiCanvas" style={{ "position": "fixed", "zIndex": "0", "width": "100vw", "height": "100vh" }}></canvas>
        </div>
    );
}