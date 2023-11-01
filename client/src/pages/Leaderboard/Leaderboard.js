import React, { useEffect } from "react";
import HeaderMain from "../../components/HeaderMain";
import LeaderboardRow from "./LeaderboardRow";
import leaders from "./sampleLeaders.json";
import axios from "axios";
import "./leaderboardStyle.css"

export default function Leaderboard() {

    useEffect(() => {
        getTopEarners()
    }, []);

    async function getTopEarners() {
        try {
            const {data} = await axios.get("/user/get-top-earners");
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <HeaderMain />
            <div id="leaderboard">
                <div id="leaderboardArea">
                    <div id="leaderboardTitle">
                        Leaderboard
                    </div>
                    <div id="leaderboardLabel">
                        Top Earning Creators
                    </div>
                    {leaders.map((user, index) => {
                        return <LeaderboardRow position={index + 1} profileImg={user.profilePic} name={user.name} solEarned={user.solEarned}/>
                    })}
                </div>
            </div>
        </div>
    );
}
