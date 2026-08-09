import React from "react";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../css/Home.css";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpenses] = useState(0);
  const [summery, setSummery] = useState(0);
  const [all, setAll] = useState([]);

  const categoryIcons = {
    food: "🍔",
    transportation: "🚕",
    housing: "🏠",
    entertainment: "🎬",
    utilities: "💡",
    healthcare: "💊",
    shopping: "🛍️",
    others: "📦",
  };
  const categoryColors = {
    food: "#ff9800",
    transportation: "#2196f3",
    housing: "#9c27b0",
    entertainment: "#e91e63",
    utilities: "#ffc107",
    healthcare: "#4caf50",
    shopping: "#3f51b5",
    others: "#607d8b",
  };

  async function getExpenseHandler(userId) {
    try {
      const ans = await fetch(`http://localhost:3000/all/expense/${userId}`);
      const exp = await ans.json();
      // console.log(exp.data);
      setExpenses(exp.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getIncomeHandler(userId) {
    try {
      const ans = await fetch(`http://localhost:3000/all/income/${userId}`);
      const exp = await ans.json();
      // console.log(exp.data);
      setIncome(exp.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getAllData(userId) {
    try {
      const ans = await fetch(`http://localhost:3000/allList/${userId}`);
      const exp = await ans.json();
      // console.log(exp.data);
      setAll(exp.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(all);

  async function getRemain(userId) {
    try {
      const ans = await fetch(`http://localhost:3000/summery/${userId}`);
      const exp = await ans.json();
      // console.log(exp.data);
      setSummery(exp.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    // console.log(id);

    if (id) {
      const userId = id?.data?.id;
      console.log(userId);

      getExpenseHandler(userId);
      getIncomeHandler(userId);
      getAllData(userId);
      getRemain(userId);
    }
  }, []);

  if (all.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="home_container">
      <div className="inside_container">
        <div className="home_hero">
          <div
            className="card bg-base-100 w-96 shadow-sm"
            style={{ padding: "2rem", background: "#D1FAE5" }}
          >
            <div className="card-body">
              <h1 className="card-title">Income</h1>
              <h3>$ {income}</h3>
              <p>Keep growing 💪</p>
            </div>
          </div>

          <div
            className="card bg-base-100 w-96 shadow-sm"
            style={{ padding: "2rem", background: "#FFD6D6" }}
          >
            <div className="card-body">
              <h2 className="card-title">💸 Expenses</h2>
              <h3>$ {expense}</h3>
              <p>Watch your budget!</p>
            </div>
          </div>
        </div>

        <div className="all_list">
          <h2 className="card-title">Balance Card</h2>
          <p>Current Balance💰</p>
          <h3> $ {summery}</h3>
        </div>

        <div className="show_all_expenses">
          <h4>All Expenses</h4>

          {all.map((item) => (
            <div key={item.id} className="todo_card">
              {/* LEFT: icon with background */}
              <div
                className="todo_left"
                style={{
                  background: categoryColors[item.category],
                }}
              >
                <span>{categoryIcons[item.category] || "📦"}</span>
              </div>

              {/* MIDDLE */}
              <div className="todo_middle">
                <div className="todo_top">
                  <h4>{item.title}</h4>
                  <span className="todo_date">
                    {new Date(item.date).toDateString()}
                  </span>
                </div>

                <p className="todo_notes">{item.notes}</p>

                <span
                  className="todo_category"
                  style={{
                    color: categoryColors[item.category],
                  }}
                >
                  {item.category.toUpperCase()}
                </span>
              </div>

              {/* RIGHT */}
              <div className="todo_right">
                <p
                  className={`todo_amount ${
                    item.type === "expense" ? "expense" : "income"
                  }`}
                >
                  {item.type === "expense" ? "-" : "+"} ₹{item.amount}
                </p>
                <button
                  className="delete_btn"
                  style={{"padding":"0.5rem","borderRadius":"50%"}}
                  onClick={() => handleDelete(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
