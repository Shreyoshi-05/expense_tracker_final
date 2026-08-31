import React from 'react'

const Emptypage = () => {
  return (
    <div className="empty_page_container">
      <div className="empty_page_card">
        <div className="empty_page_icon">📊</div>

        <h2>No Transactions Yet</h2>

        <p>
          Your financial dashboard is waiting for some data.
          Add your first income or expense to get started.
        </p>

        <button
          className="empty_page_btn"
          onClick={() => (window.location.href = "/add")}
        >
          + Add Transaction
        </button>
      </div>
    </div>
  )
}

export default Emptypage