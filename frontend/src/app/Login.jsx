import React from "react";
import "../css/Signin.css";

const Signin = () => {
  return (
    <div className="signin_container">
      <div className="content">
        <h2>Expense Tracker Log In</h2>
        <form action="">

          <div className="input">
            <h3>Email:</h3>
            <input type="email" name="email" placeholder="enter email.." />
          </div>

          <div className="input">
            <h3>Password:</h3>
            <input type="password" name="password" placeholder="enter password.." />
          </div>

          <div className="input">
            <button type="submit">Log In</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Signin;
