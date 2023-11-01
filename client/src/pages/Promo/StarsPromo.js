import React, { useEffect } from "react";
import "./starsPromo.css";
import star from "../../assets/stars2.png";

export default function StarsPromo() {

    useEffect(() => {
        scrollDown();
    }, [])

    function scrollDown() {
        // Get the current scroll position
        var currentPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
        // Calculate the target scroll position (e.g., 1000 pixels down)
        var targetPosition = currentPosition + 1000;
    
        // Calculate the distance to scroll in small steps
        var distance = 1; // Adjust this value to control the scrolling speed
    
        // Define the scroll function
        function scrollStep() {
            // Determine the direction and amount to scroll
            var scrollAmount = currentPosition < targetPosition ? Math.min(targetPosition - currentPosition, distance) : Math.max(targetPosition - currentPosition, -distance);
    
            // Scroll by the determined amount
            window.scrollBy(0, scrollAmount);
    
            // Update the current position
            currentPosition += scrollAmount;
    
            // Check if we've reached the target position
            if (currentPosition !== targetPosition) {
                // If not, request the next frame of the animation
                requestAnimationFrame(scrollStep);
            }
        }
    
        // Start the scrolling animation
        scrollStep();
    }
    
    // Call the scroll function to start scrolling
    

    return (
        <div>
            <div id="starFade"></div>
            <div id="starsTitle">venue</div>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
            <img src={star} className="singleStar"></img>
        </div>
    );
}