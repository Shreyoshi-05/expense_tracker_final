import React, { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import toast, { Toaster } from "react-hot-toast";
import "../css/pay.css"

const Pay = () => {
  const[cashfree , setCashFree] = useState(null);
  const [amount, setAmount] = useState("");

  const init = async() => {
    const cf = await load({mode : "sandbox"});
    setCashFree(cf);
  };

  useEffect(()=>{
    init();
  },[]);

    const doPayment = async () => {
      try {
        const res = await fetch ("http://localhost:3000/create-order",{
          method:"post"
        });
        const data = await res.json();
        console.log(data);

        if(!cashfree){
          toString.error("SDK not loaded yet");
          return;
        };

        if(!data.paymentSessionId){
          toast.error("not session id recived");
          return;
        };

        cashfree.checkout({
          paymentSessionId:data.paymentSessionId,
          redirectTarget: "_modal"
        })

      } catch (error) {
        console.log(error.message);
      }

    };

     return (
    <div className="payment_container">
      <div className="payment_inside">

        {/* BALANCE CARD */}
        <div className="wallet_card">
          <h2>Wallet Balance</h2>
          <p>Available balance</p>
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
            <button className="quick_btn" onClick={() => setAmount(100)}>₹100</button>
            <button className="quick_btn" onClick={() => setAmount(500)}>₹500</button>
            <button className="quick_btn" onClick={() => setAmount(1000)}>₹1000</button>
          </div>

          {/* YOUR PAYMENT BUTTON */}
          <button className="payment_btn" onClick={doPayment}>
            Proceed to Pay
          </button>

        </div>

      </div>
    </div>
  );
};

export default Pay;



