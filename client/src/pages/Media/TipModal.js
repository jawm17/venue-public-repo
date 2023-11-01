import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Web3Context } from "../../context/Web3Context";
import * as sendService from "../../services/SendService";
import polygonIcon from "../../assets/polygonChain.png";
import axios from "axios";
import "./styles/paywallModalStyle.css";
import "./styles/tipModalStyle.css";

export default function PaywallModal(props) {
  const { balance, getBalance } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [balanceError, setBalanceError] = useState(false);
  const [selectedTipAmount, setSelectedTipAmount] = useState(null);
  const [customTipAmount, setCustomTipAmount] = useState("");

  useEffect(() => {
    setBalanceError(false);
  }, [selectedTipAmount, customTipAmount]);

  useEffect(() => {
    getBalance();
  }, []);

  async function sendTip() {
    // setLoading(true);
    let tipAmount = 0;
    if (selectedTipAmount > 0) {
      tipAmount = selectedTipAmount;
    } else if (customTipAmount > 0) {
      tipAmount = customTipAmount
    }

    if (tipAmount > 0) {
      if (tipAmount > balance) {
        setBalanceError(true);
      } else {
        // send that tip baby
        setLoading(true);
        try {
          const { data } = await axios.post("/tx/transfer-token-value-tip", {
            video: props.videoData._id,
            amount: tipAmount
          });
          console.log(data);
          if (data.success) {
            props.sentTip();
            props.close();
          } else {
            if (data.message.msgBody === "Insufficient Balance") {
              setBalanceError(true);
              setLoading(false);
            } else {
              alert("Insufficient Balance");
              props.close();
            }
          }
        } catch (error) {
          console.log(error.message);
          alert("error occurred");
          props.close();
        }
      }
    }
  }

  function customTipEntered(amount) {
    if (!isNaN(amount)) {
      // amount = parseFloat(amount).toFixed(2);
      setCustomTipAmount(amount);
      setSelectedTipAmount(null);
    }
  }

  return (
    <>
      <div id="modalBlur" onClick={() => props.close()}></div>
      <div id="paywallModalBody">
        <svg onClick={() => props.close()} id="closeUnlockModal" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z"></path>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 9.75L14.25 14.25"></path>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L9.75 14.25"></path>
        </svg>
        <div id="paywallModalTitle">
          Tip {props.username ? props.username : "user"}
        </div>
        <div id="tipAmountRow">
          <div onClick={() => setSelectedTipAmount(1)} id={selectedTipAmount === 1 ? "selectedTipAmount" : ""} className="tipAmountOption">$1</div>
          <div onClick={() => setSelectedTipAmount(5)} id={selectedTipAmount === 5 ? "selectedTipAmount" : ""} className="tipAmountOption">$5</div>
          <div onClick={() => setSelectedTipAmount(25)} id={selectedTipAmount === 25 ? "selectedTipAmount" : ""} className="tipAmountOption">$25</div>
        </div>
        <div id="customTipTitleArea">
          <div id="customTipTitle">
            Custom Amount
          </div>
          <div id="tipBalance">
            balance: ${balance}
          </div>
        </div>
        <div id="customTipInputArea">
          <input type="number" id="customTipInput" value={customTipAmount} onChange={(e) => customTipEntered(e.target.value)}></input>
        </div>
        {balanceError ?
          <div id="tipBalanceError">
            Your balance is too low. <mark id="addFundsLink" onClick={() => props.buyCard()}>add funds</mark>
          </div>
          :
          null
        }
        <div id="sendTipBtn" onClick={!loading ? () => sendTip() : null}>
          {loading ?
            <div className="loaderFlex3">
              <div className="loader3">
              </div>
            </div>
            :
            <div>
              {done ? "complete" : `send ${selectedTipAmount ? "$" + selectedTipAmount : customTipAmount ? "$" + customTipAmount : ""} tip`}
            </div>
          }

        </div>
      </div>
    </>
  );
}