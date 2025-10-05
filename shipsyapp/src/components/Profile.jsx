// import React from 'react'
// import 
// { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
//  from 'react-icons/bs'
//  import 
//  { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
//  from 'recharts';

// function Profile() {

//     const data = [
//         {
//           name: '2004',
//           uv: 4000,
//           pv: 2400,
//           amt: 2400,
//         },
//         {
//           name: '2008',
//           uv: 3000,
//           pv: 1398,
//           amt: 2210,
//         },
//         {
//           name: '2012',
//           uv: 2000,
//           pv: 9800,
//           amt: 2290,
//         },
//         {
//           name: '2016',
//           uv: 2780,
//           pv: 3908,
//           amt: 2000,
//         },
//         {
//           name: '2020',
//           uv: 1890,
//           pv: 4800,
//           amt: 2181,
//         },
//         {
//           name: '2024',
//           uv: 2390,
//           pv: 3800,
//           amt: 2500,
//         },
//         {
//           name: '2028',
//           uv: 3490,
//           pv: 4300,
//           amt: 2100,
//         },
//       ];
     

//   return (
//     <main className='main-container'>
//         <div className='main-title'>
//             <h3>Company Details</h3>
//         </div>
// {/* 
//         <div className='main-cards'>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>PRODUCTS</h3>
//                     <BsFillArchiveFill className='card_icon'/>
//                 </div>
//                 <h1>300</h1>
//             </div>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>CATEGORIES</h3>
//                     <BsFillGrid3X3GapFill className='card_icon'/>
//                 </div>
//                 <h1>12</h1>
//             </div>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>CUSTOMERS</h3>
//                     <BsPeopleFill className='card_icon'/>
//                 </div>
//                 <h1>33</h1>
//             </div>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>ALERTS</h3>
//                     <BsFillBellFill className='card_icon'/>
//                 </div>
//                 <h1>42</h1>
//             </div>
//         </div> */}

//         <div className='charts'>
//             <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//             width={500}
//             height={300}
//             data={data}
//             margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//             }}
//             >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="pv" fill="#8884d8" />
//                 <Bar dataKey="uv" fill="#82ca9d" />
//                 </BarChart>
//             </ResponsiveContainer>

//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                 width={500}
//                 height={300}
//                 data={data}
//                 margin={{
//                     top: 5,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                 }}
//                 >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//                 <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//                 </LineChart>
//             </ResponsiveContainer>

//         </div>
//     </main>
//   )
// }

// export default Profile

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from "recharts";

export default function Profile() {
  const [manager, setManager] = useState({});
  const [couriers, setCouriers] = useState([]);
  const manager_id = localStorage.getItem("id");

  useEffect(() => {
    fetchManagerDetails();
    fetchManagerCouriers();
  }, []);

  const fetchManagerDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/auth/manager/${manager_id}`);
      if (res.data.Status) setManager(res.data.Result);
    } catch (err) {
      console.error("Error fetching manager details:", err);
    }
  };

  const fetchManagerCouriers = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/courier/manager/${manager_id}`);
      if (res.data.Status) setCouriers(res.data.Result);
    } catch (err) {
      console.error("Error fetching couriers:", err);
    }
  };

  // ✅ Prepare Data for Charts
  const deliveredCount = couriers.filter(c => c.status === "delivered").length;
  const pendingCount = couriers.filter(c => c.status === "pending").length;

  const statusData = [
    { name: "Delivered", count: deliveredCount },
    { name: "Pending", count: pendingCount },
  ];

  // ✅ Group couriers by date for trend graph
  const dateMap = {};
  couriers.forEach(c => {
    const date = new Date(c.created_at).toLocaleDateString();
    if (!dateMap[date]) dateMap[date] = { date, Delivered: 0, Pending: 0 };
    if (c.status === "delivered") dateMap[date].Delivered += 1;
    else dateMap[date].Pending += 1;
  });

  const trendData = Object.values(dateMap);

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold mb-4">📊 Manager Profile Dashboard</h2>

      {/* Manager Details */}
      <div className="shadow-sm p-4 rounded bg-light mb-4 text-center">
        <h4 className="mb-2">{manager?.name || "Manager"}</h4>
        <p className="mb-1"><strong>Email:</strong> {manager?.email || "—"}</p>
        <p className="mb-1"><strong>Phone:</strong> {manager?.phone || "—"}</p>
      </div>

      <div className="row">
        {/* Status Bar Chart */}
        <div className="col-md-6 mb-4">
          <div className="shadow-sm p-3 rounded bg-white">
            <h5 className="text-center mb-3">Courier Status Overview</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4CAF50" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Trends */}
        <div className="col-md-6 mb-4">
          <div className="shadow-sm p-3 rounded bg-white">
            <h5 className="text-center mb-3">Courier Creation Trends</h5>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Delivered" stroke="#4CAF50" strokeWidth={2} />
                <Line type="monotone" dataKey="Pending" stroke="#FFC107" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
