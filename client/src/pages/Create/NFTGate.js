import React, { useEffect } from "react";
import axios from "axios";
import "./styles/nftGateStyle.css";

export default function NFTGate() {

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const apiKey = "28NZ7SNT9UM6MN91BXXKCEUBRNEYCYIKZU";
        const qAddress = "0x533d5e63226Aab49C7BA3c3387ffA09e0bAf2F10"
        const contract = ""
        try {
            const res = await axios.get(`https://api.etherscan.io/api?module=account&action=addresstokennftbalance&address=${qAddress}&page=1&offset=100&apikey=${apiKey}`);
 
        } catch (error) {
  
        }
    }

    return (
        <div>
            gate this bitch
        </div>
    )
}