import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StatusBadge from "../common/StatusBadge";

const AdminBids = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/admin-bid-list");
      setData(res?.data?.result || []);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  return (
    <div className="admin-container container-fluid py-4">
      <div className="heading-section">
        <span className="dash-eyebrow">Zentora Admin</span>
        <h2 className="dash-heading">All Bids</h2>
      </div>

      <div className="dash-card">
        <div className="table-responsive">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Freelancer</th>
                <th>Amount</th>
                <th>Duration</th>
                <th>Tokens Used</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item?.project?.title || "-"}</td>
                    <td>{item?.developer?.name || "-"}</td>
                    <td>{item?.amount}</td>
                    <td>{item?.duration}</td>
                    <td>{item?.tokensUsed}</td>
                    <td><StatusBadge status={item?.status} /></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No Bids Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBids;
