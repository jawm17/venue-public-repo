import React, {useEffect, useState} from "react";
import { magic } from "../lib/magic";

export default function GoogleLanding() {
    const [userData, setUserData] = useState("")
    const finishSocialLogin = async () => {
        try {
            const result = await magic.oauth.getRedirectResult();

            setUserData(result.oauth.userInfo.email);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        finishSocialLogin();
    }, []);

    return (
        <div>
            {userData}
        </div>
    )
}