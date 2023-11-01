import React from "react";
import "./styles/withdrawModalStyle.css";

export default function WithdrawModal(props) {

    return (
        <div>
            <div id="modalBlur" onClick={() => props.cancel()}></div>
            <div id="withdrawBody">
                <svg onClick={() => props.cancel()} id="closeAuth" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div id="withdrawTitle">
                    Withdraw
                </div>
                <div id="withdrawSub">
                    withdrawals coming soon!
                </div>
            </div>
        </div>
    );
}