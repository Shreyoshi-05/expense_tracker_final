import React from 'react'

const Emptypage = () => {
  return (
    <div className="home_container">
      <div className="inside_container">

        {/* Income + Expense */}
        <div className="home_hero">
          <div className="skeleton income_skeleton"></div>
          <div className="skeleton expense_skeleton"></div>
        </div>

        {/* Balance */}
        <div className="skeleton balance_skeleton"></div>

        {/* All Expenses */}
        <div className="expenses_skeleton_container">
          <div className="skeleton skeleton_heading"></div>

          <div className="skeleton transaction_skeleton"></div>
          <div className="skeleton transaction_skeleton"></div>
          <div className="skeleton transaction_skeleton"></div>
        </div>

      </div>
    </div>
  )
}

export default Emptypage