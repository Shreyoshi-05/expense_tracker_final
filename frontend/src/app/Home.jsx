import React from "react";
import "../css/Home.css";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Emptypage from "./Emptypage";
import NoTransitions from "./NoTransitions";

const Home = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpenses] = useState(0);
  const [summery, setSummery] = useState(0);
  const [all, setAll] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [report, setReport] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
      const ans = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/all/expense/${userId}`,
      );

      console.log("EXPENSE STATUS:", ans.status);
      console.log("EXPENSE TYPE:", ans.headers.get("content-type"));

      const exp = await ans.json();
      setExpenses(exp.data);
    } catch (error) {
      console.log("EXPENSE ERROR:", error.message);
    }
  }

  async function getIncomeHandler(userId) {
    try {
      const ans = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/all/income/${userId}`,
      );

      console.log("INCOME STATUS:", ans.status);
      console.log("INCOME TYPE:", ans.headers.get("content-type"));

      const exp = await ans.json();
      setIncome(exp.data);
    } catch (error) {
      console.log("INCOME ERROR:", error.message);
    }
  }

  async function getAllData(userId) {
    try {
      const ans = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/allList/${userId}`,
      );

      console.log("ALL STATUS:", ans.status);
      console.log("ALL TYPE:", ans.headers.get("content-type"));

      const exp = await ans.json();
      setAll(exp.data);
    } catch (error) {
      console.log("ALL ERROR:", error.message);
    }
  }

  async function getRemain(userId) {
    try {
      const ans = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/summery/${userId}`,
      );

      console.log("SUMMARY STATUS:", ans.status);
      console.log("SUMMARY TYPE:", ans.headers.get("content-type"));

      const exp = await ans.json();
      setSummery(exp.data);
    } catch (error) {
      console.log("SUMMARY ERROR:", error.message);
    }
  }

  async function getReport(uid) {
    try {
      const ans = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/ask/${uid}`,
      );

      console.log("REPORT STATUS:", ans.status);
      console.log("REPORT TYPE:", ans.headers.get("content-type"));

      const data = await ans.json();

      console.log("AI RESPONSE:", data);

      setReport(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/delete/${id}`,
        {
          method: "put",
        },
      );

      const ans = await data.json();

      if (ans.success) {
        toast.success(ans.message);

        setAll((pre) => pre.filter((item) => item.id != id));
      } else {
        toast.error(ans.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const id = JSON.parse(localStorage.getItem("user"));

        if (id) {
          const userId = id?.data?.id;

          await Promise.all([
            getExpenseHandler(userId),
            getIncomeHandler(userId),
            getAllData(userId),
            getRemain(userId),
            getReport(userId),
          ]);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Emptypage />;
  }

  if (all.length === 0) {
    return <NoTransitions />;
  }

  const filteredExpenses = all.filter((item) => {
    const searchValue = search.toLowerCase().trim();

    return (
      item.title?.toLowerCase().includes(searchValue) ||
      item.category?.toLowerCase().includes(searchValue) ||
      item.notes?.toLowerCase().includes(searchValue) ||
      item.type?.toLowerCase().includes(searchValue)
    );
  });

  const pageNo = Math.ceil(filteredExpenses.length / 3);

  return (
    <div className="home_container">
      <Toaster />

      <div className="inside_container">
        <div className="home_hero">
          <div className="card income_card">
            <div className="card-body">
              <h1 className="card-title">💰 Income</h1>
              <h3>$ {income}</h3>
              <p>Keep growing 💪</p>
            </div>
          </div>

          <div className="card expense_card">
            <div className="card-body">
              <h2 className="card-title">💸 Expenses</h2>
              <h3>$ {expense}</h3>
              <p>Watch your budget!</p>
            </div>
          </div>
        </div>

        <div className="all_list">
          <div className="balance_header">
            <h2>Balance Card</h2>
          </div>

          <div className="balance_content">
            <div className="balance_left">
              <p>Current Balance 💰</p>
              <h3>₹ {summery}</h3>
            </div>

            <div className="ai_report_button">
              <div className="ai_title">✨ AI Spending Analysis</div>

              <button
                className="ai_view_btn"
                onClick={() => setShowReport(!showReport)}
              >
                {showReport ? "Hide AI Report ↑" : "View AI Report →"}
              </button>
            </div>
          </div>

          {showReport && (
            <div className="ai_report">
              <div className="ai_report_header">
                <h3>✨ AI Financial Report</h3>
              </div>

              <div className="ai_report_content">{report}</div>
            </div>
          )}
        </div>

        <div className="show_all_expenses">
          <div className="expenses_header">
            <h4>All Expenses</h4>

            <div className="expense_search_box">
              <span className="search_icon">🔍</span>

              <input
                type="text"
                placeholder="Search expenses..."
                className="expense_search_input"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {filteredExpenses.length === 0 ? (
            <p className="no_search_result">
              No matching expenses found 🔍
            </p>
          ) : (
            filteredExpenses
              .slice(page * 3 - 3, page * 3)
              .map((item) => (
                <div key={item.id} className="todo_card">
                  <div
                    className="todo_left"
                    style={{
                      background: categoryColors[item.category],
                    }}
                  >
                    <span>{categoryIcons[item.category] || "📦"}</span>
                  </div>

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
                      style={{
                        padding: "0.5rem",
                        borderRadius: "50%",
                      }}
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
          )}

          {filteredExpenses.length > 0 && (
            <div className="page_container">
              <div className="pagination">
                <span
                  onClick={() => {
                    if (page > 1) {
                      setPage((pre) => pre - 1);
                    }
                  }}
                  className="page-number"
                >
                  {"<"}
                </span>

                <span className="page-number">
                  Page {page}
                </span>

                <span
                  onClick={() => {
                    if (page < pageNo) {
                      setPage((pre) => pre + 1);
                    }
                  }}
                  className="page-number"
                >
                  {">"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;