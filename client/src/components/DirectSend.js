import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthWindow from "./AuthWindow";
import ethIcon from "../assets/polygonChain.png";
import axios from "axios";
import * as sendService from "../services/SendService";
import "./styles/directSendStyle.css";

export default function DirectSend(props) {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const [searching, setSearching] = useState(false);
  const [amount, setAmount] = useState("");
  const [bal, setBal] = useState(0);
  const [authWindow, setAuthWindow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    getBalance();
    return () => (document.body.style.overflow = "scroll");
  }, []);

  async function getBalance() {
    const bal = await sendService.getAccountBalance(user.address);
    setBal(bal);
  }

  async function sendTx() {
    if (user) {
      if (props.userID && props.userAddress) {
        if (amount > 0 && amount < bal) {
          setLoading(true)
          const data = await sendService.sendMeta(props.userAddress, user.address, amount, props.userID, user._id, null, "direct");

          if (data.error) {
            if (data.error === "meta") {
              alert("declined metamask");
              setLoading(false)
            } else if (data.error === "db") {
              alert("db error");
            }
          } else {
            setSuccess(true);
            setTimeout(() => {
              props.close();
            }, 1200);
          }
        } else {
          alert("insufficient balance");
          setLoading(false)
        }
      }
    } else {
      props.close()
    }
  }

  function changeAmount(e) {
    if (!isNaN(e.target.value)) {
      setAmount(e.target.value);
    }
  }

  return (
    <div>
      {user ? (
        <div id="directOuter">
          <div id="directModal">

            {loading ? <div id="authLoading"></div> : null}

            <svg onClick={() => props.close()} id="closeDirect" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z"></path>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 9.75L14.25 14.25"></path>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L9.75 14.25"></path>
            </svg>

            <div>
              <div id="amountArea">
                <div
                  id="amountBg"
                  style={
                    searching
                      ? { borderColor: "rgb(95, 247, 95)" }
                      : { borderColor: "transparent" }
                  }
                >
                  <div id="searchIconFlex"><img id="ethSendLogo" src={ethIcon}></img></div>
                  <input
                    autoComplete="off"
                    id="searchInput"
                    placeholder="amount of MATIC to send"
                    onChange={(e) => changeAmount(e)}
                    value={amount}
                    onBlur={() => setSearching(false)}
                    onFocus={() => setSearching(true)}
                  ></input>
                </div>
                <div id="sendBalance">
                  balance: {bal} MATIC
                </div>
                <div
                  id="maxAmountBtn"
                  onClick={() =>
                    setAmount(bal)
                  }
                >
                  max
                </div>
              </div>
            </div>

            <div id="directTitle">Send MATIC to {props.username}</div>
            <div id="cancelDirect" onClick={() => sendTx()}>
              {loading ? success ?
                <div id="directSuccess">
                  <div id="directSuccessMsg">
                    success
                  </div>
                  <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                    <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"></path>
                  </svg>
                </div>
                :
                <div className="loaderAuth"></div>
                : "send"}
            </div>
          </div>
        </div>
      ) : (
        <AuthWindow cancel={() => props.close()} />
      )}
    </div>
  );
}
