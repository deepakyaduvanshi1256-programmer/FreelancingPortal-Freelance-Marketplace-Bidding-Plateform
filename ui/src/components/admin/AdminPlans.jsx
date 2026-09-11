import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";

const schema = yup.object({
  name: yup.string().required("Plan name is required"),
  tokens: yup.number().typeError("Tokens must be a number").positive().integer().required("Tokens are required"),
  price: yup.string().required("Price is required"),
  description: yup.string(),
});

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axiosInstance.get("/admin-plan-list");
      setPlans(res?.data?.result || []);
    } catch (error) {
      console.log(error);
      setPlans([]);
    }
  };

  const handleCreate = async (data) => {
    try {
      const res = await axiosInstance.post("/admin-create-plan", data);
      if (res?.data?.success) {
        Swal.fire({ title: "Plan", text: res?.data?.message, icon: "success" });
        reset();
        fetchPlans();
      } else {
        Swal.fire({ title: "Plan", text: res?.data?.message, icon: "error" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: error.response?.data?.message || "Something went wrong", icon: "error" });
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora Admin</span>
          <h2 className="dash-heading">Token Plans</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="dash-card mb-4">
            <h4>Create New Plan</h4>
            <form onSubmit={handleSubmit(handleCreate)}>
              <div className="row g-3">
                <div className="col-12 col-sm-3">
                  <label className="form-label">Plan Name</label>
                  <input type="text" className="form-control" placeholder="e.g. Starter" {...register("name")} />
                  <div className="text-danger small">{errors.name?.message}</div>
                </div>
                <div className="col-12 col-sm-3">
                  <label className="form-label">Tokens</label>
                  <input type="number" className="form-control" placeholder="e.g. 50" {...register("tokens")} />
                  <div className="text-danger small">{errors.tokens?.message}</div>
                </div>
                <div className="col-12 col-sm-3">
                  <label className="form-label">Price (₹)</label>
                  <input type="text" className="form-control" placeholder="e.g. 499" {...register("price")} />
                  <div className="text-danger small">{errors.price?.message}</div>
                </div>
                <div className="col-12 col-sm-3 d-flex align-items-end">
                  <button type="submit" className="btn btn-orange w-100">Create Plan</button>
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <input type="text" className="form-control" placeholder="Short description" {...register("description")} />
                </div>
              </div>
            </form>
          </div>

          <div className="dash-card">
            <h4>Existing Plans</h4>
            <div className="table-responsive">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Tokens</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.length > 0 ? (
                    plans.map((p) => (
                      <tr key={p._id}>
                        <td>{p.name}</td>
                        <td>{p.tokens}</td>
                        <td>₹{p.price}</td>
                        <td>{p.description || "-"}</td>
                        <td>{p.status === "active" ? <span className="active">Active</span> : <span className="inactive">Inactive</span>}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">No Plans Yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPlans;
