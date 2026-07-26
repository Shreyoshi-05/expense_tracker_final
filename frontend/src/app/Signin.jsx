import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import "../css/Signin.css";

const Signin = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async(e) => {
    e.preventDefault();

    try {
      console.log(name,email,password);

      const ans = await fetch("http://localhost:3000/user",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name,email,password})
      });

      const data = await ans.json();
      toast.success(data.message);

      setname("");
      setEmail("");
      setPassword("");

    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="signin_container">
      <Toaster />
      <div className="content">
        <h2>Expense Tracker Sign In</h2>
        <form action="" onSubmit={handelSubmit}>
          <div className="input">
            <h3>Name:</h3>
            <input
              type="text"
              value={name}
              name="name"
              placeholder="enter name.."
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="input">
            <h3>Email:</h3>
            <input
              type="email"
              value={email}
              name="email"
              placeholder="enter email.."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <h3>Password:</h3>
            <input
              type="password"
              value={password}
              name="password"
              placeholder="enter password.."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input">
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
