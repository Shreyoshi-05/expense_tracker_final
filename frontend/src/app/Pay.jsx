import React, { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import toast, { Toaster } from "react-hot-toast";
import "../css/pay.css";

const Pay = () => {
  const [cashfree, setCashFree] = useState(null);
  const [amount, setAmount] = useState("");
  const [leaderboard, setLeaderBoard] = useState(false);
  const [leaderboarddata, setLeaderboardData] = useState([]);

  const init = async () => {
    const cf = await load({ mode: "sandbox" });
    setCashFree(cf);
  };

  useEffect(() => {
    init();
  }, []);

  async function getLB() {
    try {
      const ans = await fetch(`https://expense-tracker-backend-8se2.onrender.com/leaderboard`);
      const data = await ans.json();
      console.log(data);
      setLeaderboardData(data.data);
      // console;
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (leaderboard) {
      getLB()
    }
  }, [leaderboard]);

  const doPayment = async () => {
    try {
      const res = await fetch("https://expense-tracker-backend-8se2.onrender.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
        }),
      });
      const data = await res.json();
      console.log(data);

      if (!cashfree) {
        toast.error("SDK not loaded yet");
        return;
      }

      if (!data.paymentSessionId) {
        toast.error("not session id recived");
        return;
      }

      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        // redirectTarget: "_modal",
        redirectTarget: "_self",
      });

    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log(leaderboard);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order_id");

  if (orderId) {
    setLeaderBoard(true);
  }
}, []);

  return (
    <div className="payment_container">
      <div className="payment_inside">
        {/* BALANCE CARD */}
        <div className="wallet_card">
          <div className="ledaerbord_hd">
            🏆 Unlock the Leaderboard
          </div>
          <h3 className="wallet_amount">₹ 5000</h3>
        </div>

        {/* PAYMENT CARD */}
        <div className="payment_card">
          <h2>Add Money</h2>

          <input
            type="number"
            placeholder="Enter amount"
            className="payment_input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* QUICK SELECT */}
          <div className="quick_amounts">
            <button className="quick_btn" onClick={() => setAmount(100)}>
              ₹100
            </button>
            <button className="quick_btn" onClick={() => setAmount(500)}>
              ₹500
            </button>
            <button className="quick_btn" onClick={() => setAmount(1000)}>
              ₹1000
            </button>
          </div>

          {/* YOUR PAYMENT BUTTON */}
          <button className="payment_btn" onClick={doPayment}>
            Proceed to Pay
          </button>
        </div>
      </div>

      <div
        className="leaderboard_btn"
        value={leaderboard}
        onClick={() => setLeaderBoard(!leaderboard)}
      >
        🏆
      </div>

      {leaderboard && (
        <div className="leader_board" onClick={() => setLeaderBoard(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <h2>🏆 Leaderboard</h2>

            {leaderboarddata.map((lb, idx) => {
              return (
                <div className="leader_item" key={idx}>
                  <span>{lb.name}</span>
                  <span>₹ {lb.saveings}</span>
                </div>
              );
            })}

            <button className="close_btn" onClick={() => setLeaderBoard(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay;
