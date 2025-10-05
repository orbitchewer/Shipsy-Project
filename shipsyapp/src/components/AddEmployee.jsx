import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    pincode: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!employee.name || !employee.email || !employee.password || !employee.phone || !employee.pincode) {
      alert("Please fill all fields");
      return;
    }

axios.post(`${import.meta.env.VITE_API_URL}/employee/add`, employee, { withCredentials: true })
      .then((res) => {
        if (res.data.Status) {
          alert("Employee added successfully!");
          navigate("/dashboard/employee");
        } else {
          alert(res.data.Error || "Something went wrong");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Server error while adding employee");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Name"
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-0"
              placeholder="Enter Email"
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-0"
              placeholder="Enter Password"
              onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Phone Number"
              onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enter Pincode"
              onChange={(e) => setEmployee({ ...employee, pincode: e.target.value })}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
