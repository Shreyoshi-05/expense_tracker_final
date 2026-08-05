import React from 'react'
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../css/Home.css"

const data = [
  { name: "Food", value: 400 },
  { name: "Travel", value: 300 },
  { name: "Shopping", value: 200 },
  { name: "Bills", value: 100 },
];

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];


const Home = () => {

  return (
    <div className="home_container">
       <div className="main_container">this is home</div>
    </div>
    // <div style={{ display: "flex", justifyContent: "center" }}>
    //   <PieChart width={300} height={300}>
    //     <Pie
    //       data={data}
    //       cx="50%"
    //       cy="50%"
    //       outerRadius={100}
    //       dataKey="value"
    //     >
    //       {data.map((entry, index) => (
    //         <Cell key={index} fill={COLORS[index]} />
    //       ))}
    //     </Pie>
    //     <Tooltip />
    //   </PieChart>
    // </div>
  )
}

export default Home