import React from 'react'
import { useNavigate } from "react-router-dom";
import "../css/notransition.css"

const NoTransitions = () => {
  return (
    <div className="empty_transaction_page">
      <div className="empty_transaction_card">

        <div className="empty_icon_container">
          <span className="empty_wallet">💰</span>
        </div>

        <h1>No Transactions Yet</h1>

        <p className="empty_description">
          You haven't added any income or expenses yet.
          Start tracking your money by adding your first transaction.
        </p>

        <div className="empty_info">
          <div className="empty_info_item">
            <span>💵</span>
            <div>
              <h3>Add Income</h3>
              <p>Keep track of the money you earn.</p>
            </div>
          </div>

          <div className="empty_info_item">
            <span>💸</span>
            <div>
              <h3>Add Expense</h3>
              <p>Record where your money is going.</p>
            </div>
          </div>
        </div>

        <button
          className="add_first_transaction"
          onClick={() => navigate("/add")}
        >
          + Add Your First Transaction
        </button>

      </div>
    </div>
  )
}

export default NoTransitions