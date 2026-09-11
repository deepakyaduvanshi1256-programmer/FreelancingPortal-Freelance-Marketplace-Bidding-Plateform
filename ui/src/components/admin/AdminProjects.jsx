import React, { useEffect, useState } from "react";
import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import StatusBadge from "../common/StatusBadge";

const AdminProjects = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/admin-project-list");
      setData(res?.data?.result || []);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  const blockProject = async (projectId) => {
    const confirm = await Swal.fire({
      title: "Block this project?",
      text: "This stops any further bidding on it (use for disputes/flags).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, block it",
    });
    if (!confirm.isConfirmed) return;
    try {
      const res = await axiosInstance.post("/admin-block-project", { projectId });
      if (res?.data?.success) {
        Swal.fire({ title: "Project", text: res?.data?.message, icon: "success" });
        fetchData();
      } else {
        Swal.fire({ title: "Project", text: res?.data?.message, icon: "error" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: error.response?.data?.message || "Something went wrong", icon: "error" });
    }
  };

  return (
    <div className="admin-container container-fluid py-4">
      <div className="heading-section">
        <span className="dash-eyebrow">Zentora Admin</span>
        <h2 className="dash-heading">All Projects</h2>
      </div>

      <div className="dash-card">
        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Budget</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item?.title}</td>
                    <td>{item?.budget}</td>
                    <td>{item?.duration}</td>
                    <td><StatusBadge status={item?.status} /></td>
                    <td>
                      {item?.status !== "blocked" ? (
                        <button className="block-btn" onClick={() => blockProject(item._id)}>
                          <FaBan /> Block
                        </button>
                      ) : (
                        <span className="text-muted">Blocked</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">No Projects Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
