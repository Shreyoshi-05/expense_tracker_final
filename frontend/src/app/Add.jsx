import React, { useState } from "react";
import "../css/add.css";
import toast, { Toaster } from 'react-hot-toast';

const Add = () => {
  const [tab, setTab] = useState("income");
  const [input, setInput] = useState({
    title: "",
    date: "",
    amount: "",
    category: "",
    notes: "",
  });

  

  

  async function handelAddInfo(e) {
    e.preventDefault();
    console.log(input);

    const ii = JSON.parse(localStorage.getItem("user"));
    const id = ii?.data?.id;
    console.log(id);

    const payload = {
      type:tab,
      userId:id,
      data:input
    }

    try {
      const ans = await fetch("http://localhost:3000/expense",{
        "method":"post",
        "headers":{"Content-Type":"application/json"},
        "body":JSON.stringify(payload)
      })
      const data = await ans.json();
      console.log(data);
      toast.success(data.message);

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="addcontainer">
      <Toaster />
      <div className="contant">
        <div className="tabs tabs-box">
          <input
            type="radio"
            name="income"
            onClick={(e) => setTab(e.target.name)}
            className="tab"
            aria-label="Income"
            style={{
              padding: "0.7rem 2rem",
              "margin-right": "0.6rem",
              color: "#AD49E1",
            }}
            onC
          />
          <input
            type="radio"
            name="expense"
            onClick={(e) => setTab(e.target.name)}
            className="tab"
            aria-label="Expense"
            defaultChecked
            style={{ padding: "0.7rem 2rem", color: "#AD49E1" }}
          />
        </div>

        <div className="front">
          <form action="" onSubmit={handelAddInfo}>
            <div className="sec">
              <h3>title:</h3>
              <input
                type="text"
                placeholder="enter title..."
                value={input.title}
                name="title"
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="sec">
              <h3>Amount:</h3>
              <input
                type="numer"
                placeholder="enter amount..."
                value={input.amount}
                name="amount"
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="sec">
              <h3>Date:</h3>
              <input
                type="date"
                placeholder="enter date..."
                value={input.date}
                name="date"
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="sec">
              <h3>Select Category:</h3>
              <select
                id="category"
                name="category"
                value={input.category}
                name="category"
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              >
                <option value="food">Food</option>
                <option value="transportation">Transportation</option>
                <option value="housing">Housing</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="healthcare">Healthcare</option>
                <option value="shopping">Shopping</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="sec">
              <h3>Notes :</h3>
              <textarea
                name=""
                id=""
                rows={6}
                value={input.notes}
                name="notes"
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              ></textarea>
            </div>

            <button type="submit">
              {tab == "income" ? "Add Income" : "Add Expense"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
