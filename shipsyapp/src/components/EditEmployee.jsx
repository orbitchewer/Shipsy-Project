import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: ""
  });

  useEffect(() => {
axios.get(`${import.meta.env.VITE_API_URL}/employee/detail/` + id)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

axios.put(`${import.meta.env.VITE_API_URL}/employee/edit/` + id, employee)
      .then((result) => {
        if (result.data.Status) {
          alert("Employee updated successfully!");
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <div className="p-4 rounded w-50 border">
        <h3 className="text-center mb-3">Edit Employee</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter employee name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={employee.pincode}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter pincode"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
