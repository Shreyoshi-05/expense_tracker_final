import React from "react";
import "../css/Signin.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();

    try {
      const ans = await fetch("http://localhost:3000/userlogin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await ans.json();
      console.log(data);

      if (data.success) {
        toast.success(data.message);

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

  return (
    <div className="signin_container">
      <Toaster />
      <div className="content">
        <h2>Expense Tracker Log In</h2>
        <form action="" onSubmit={handelSubmit}>
          <div className="input">
            <h3>Email:</h3>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter email.."
            />
          </div>

          <div className="input">
            <h3>Password:</h3>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password.."
            />
          </div>

          <div className="input">
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
