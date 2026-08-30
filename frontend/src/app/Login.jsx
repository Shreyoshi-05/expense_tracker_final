import React from "react";
import "../css/Login.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();

    try {
      const ans = await fetch("https://expense-tracker-backend-8se2.onrender.com/userlogin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await ans.json();
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("user",JSON.stringify(data));

        setTimeout(() => {
          nav("/");
        }, 1000);

      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  async function handleForgot(params) {
    if(!email){
      toast.error("enter your  email first");
      return;
    }

    try {
      const ans = await fetch("https://expense-tracker-backend-8se2.onrender.com/password/forgot",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email})
      });
      const data = await ans.json();

      if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    } catch (error) {
      toast.error(error.message);
    }
  }

  

  return (
    <div className="signin_container">
      <Toaster />
      <div className="content">
        <h2>Expense Tracker Log In</h2>
        <form action="" onSubmit={handelSubmit}>
          <div className="input">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter email.."
            />
          </div>

          <div className="input">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password.."
            />
          </div>
         <button type="button" onClick={handleForgot}>fotget password</button>

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
