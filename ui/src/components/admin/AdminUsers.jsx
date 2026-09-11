import React, { useEffect, useState } from "react";
import { FaBan, FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";

const AdminUsers = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/admin-user-list");
      setData(res?.data?.result || []);
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  const toggleBlock = async (item) => {
    try {
      const res = await axiosInstance.post("/admin-toggle-block-user", {
        userId: item._id,
        isBlocked: !item.isBlocked,
      });
      if (res?.data?.success) {
        Swal.fire({ title: "User", text: res?.data?.message, icon: "success" });
        fetchData();
      } else {
        Swal.fire({ title: "User", text: res?.data?.message, icon: "error" });
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: error.response?.data?.message || "Something went wrong", icon: "error" });
    }
  };

  return (
    <div className="admin-container container-fluid py-4">

      <div className="heading-section">
        <span className="dash-eyebrow">
          Zentora Admin
        </span>

        <h2 className="dash-heading">
          Manage Freelancers / Users
        </h2>
      </div>


      <div className="dash-card">

        <div className="table-responsive">

          <table className="dash-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Credits</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.length > 0 ?
                  data.map((item) => (
                    <tr key={item._id}>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.type}</td>
                      <td>{item?.credit || 0}</td>
                      <td>  {
                        !item?.isBlocked ? <span className="active">Active</span> : <span className="inactive">Blocked</span>
                      }

                      </td> <td>
                        {!item?.isBlocked ? (
                          <button className="block-btn" onClick={() => toggleBlock(item)}>
                            <FaBan />
                            Block
                          </button>
                        ) : (
                          <button className="unblock-btn" onClick={() => toggleBlock(item)}>
                            <FaCheck />
                            Unblock
                          </button>
                        )}

                      </td>
                    </tr>
                  )) :
                  <tr>
                    <td colSpan="6" className="no-data">
                      No Users Found
                    </td>
                  </tr>

              }


            </tbody>

          </table>

        </div>

      </div>


    </div>
  )
}


export default AdminUsers;
