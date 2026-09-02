import React from "react";

const Emptypage = () => {
  return (
    <div className="home_container">
      <div className="inside_container">

        {/* TOP 2 CARDS */}
        <div className="home_hero">
          <div className="card">
            <div className="skeleton h-5 w-28 mb-4"></div>
            <div className="skeleton h-8 w-32 mb-3"></div>
            <div className="skeleton h-4 w-24"></div>
          </div>

          <div className="card">
            <div className="skeleton h-5 w-28 mb-4"></div>
            <div className="skeleton h-8 w-32 mb-3"></div>
            <div className="skeleton h-4 w-24"></div>
          </div>
        </div>

        {/* BALANCE SECTION */}
        <div className="all_list">
          <div className="skeleton h-6 w-36 mb-6"></div>

          <div className="balance_content">
            <div className="balance_left">
              <div className="skeleton h-4 w-32 mb-3"></div>
              <div className="skeleton h-9 w-40"></div>
            </div>

            <div className="ai_report_button">
              <div className="skeleton h-4 w-40 mb-4"></div>
              <div className="skeleton h-10 w-full"></div>
            </div>
          </div>
        </div>

        {/* TRANSACTION SECTION */}
        <div className="show_all_expenses">
          <div className="skeleton h-6 w-32 mb-5"></div>

          {[1, 2, 3].map((item) => (
            <div key={item} className="todo_card">

              {/* ICON */}
              <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>

              {/* MIDDLE */}
              <div className="todo_middle">
                <div className="todo_top">
                  <div className="skeleton h-5 w-32"></div>
                  <div className="skeleton h-3 w-24"></div>
                </div>

                <div className="skeleton h-3 w-3/4 mt-3"></div>
                <div className="skeleton h-4 w-20 mt-3"></div>
              </div>

              {/* RIGHT */}
              <div className="todo_right">
                <div className="skeleton h-5 w-20 mb-3"></div>
                <div className="skeleton h-9 w-9 rounded-full"></div>
              </div>

            </div>
          ))}

          {/* PAGINATION */}
          <div className="page_container">
            <div className="pagination">
              <div className="skeleton h-10 w-10"></div>
              <div className="skeleton h-10 w-20"></div>
              <div className="skeleton h-10 w-10"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Emptypage;