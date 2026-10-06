// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import Swal from 'sweetalert2'
// import axiosInstance from '../../utils/axiosInstance'
// import StatusBadge from '../common/StatusBadge'

// const UserProjects = () => {
//   const [tab, setTab] = useState('open') // open | mine
//   const [openProjects, setOpenProjects] = useState([])
//   const [myProjects, setMyProjects] = useState([])
//   const [bidProject, setBidProject] = useState(null) // project currently being bid on
//   const { register, handleSubmit, reset, formState: { errors } } = useForm()

//   useEffect(() => {
//     fetchOpen()
//     fetchMine()
//   }, [])

//   const fetchOpen = async () => {
//     try {
//       const res = await axiosInstance.get('/developer-open-projects')
//       setOpenProjects(res?.data?.result || [])
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const fetchMine = async () => {
//     try {
//       const res = await axiosInstance.get('/developer-my-projects')
//       setMyProjects(res?.data?.result || [])
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const openBidForm = (project) => {
//     setBidProject(project)
//     reset({ amount: '', duration: '', proposal: '' })
//   }

//   const submitBid = async (data) => {
//     try {
//       const res = await axiosInstance.post('/developer-place-bid', {
//         projectId: bidProject._id,
//         amount: data.amount,
//         duration: data.duration,
//         proposal: data.proposal,
//       })
//       if (res?.data?.success) {
//         Swal.fire({ title: 'Bid', text: res?.data?.message, icon: 'success' })
//         setBidProject(null)
//         fetchOpen()
//       } else {
//         Swal.fire({ title: 'Bid', text: res?.data?.message, icon: 'error' })
//       }
//     } catch (error) {
//       Swal.fire({ title: 'Error', text: error.response?.data?.message || 'Something went wrong', icon: 'error' })
//     }
//   }

//   return (
//     <div className="container py-5">
//       <div className="row">
//         <div className="col-12">
//           <span className="dash-eyebrow">Zentora for Freelancers</span>
//           <h2 className="dash-heading">Browse Projects</h2>
//         </div>
//       </div>

//       <div className="row mb-3">
//         <div className="col-12">
//           <button className={`btn btn-sm me-2 ${tab === 'open' ? 'btn-orange' : 'btn-outline-secondary'}`} onClick={() => setTab('open')}>Open Projects</button>
//           <button className={`btn btn-sm ${tab === 'mine' ? 'btn-orange' : 'btn-outline-secondary'}`} onClick={() => setTab('mine')}>My Assigned Work</button>
//         </div>
//       </div>

//       {tab === 'open' && (
//         <div className="row">
//           <div className="col-12">
//             <div className="dash-card">
//               <div className="table-responsive">
//                 <table className="table dash-table mb-0">
//                   <thead>
//                     <tr>
//                       <th>Title</th>
//                       <th>Description</th>
//                       <th>Budget</th>
//                       <th>Duration</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {openProjects.length > 0 ? openProjects.map((p) => (
//                       <tr key={p._id}>
//                         <td>{p.title}</td>
//                         <td>{p.des}</td>
//                         <td>₹{p.budget}</td>
//                         <td>{p.duration}</td>
//                         <td>
//                           <button className="btn btn-sm btn-orange" onClick={() => openBidForm(p)}>Place Bid</button>
//                         </td>
//                       </tr>
//                     )) : (
//                       <tr><td colSpan="5" className="no-data">No open projects right now</td></tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {tab === 'mine' && (
//         <div className="row">
//           <div className="col-12">
//             <div className="dash-card">
//               <div className="table-responsive">
//                 <table className="table dash-table mb-0">
//                   <thead>
//                     <tr>
//                       <th>Title</th>
//                       <th>Budget</th>
//                       <th>Duration</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {myProjects.length > 0 ? myProjects.map((p) => (
//                       <tr key={p._id}>
//                         <td>{p.title}</td>
//                         <td>₹{p.budget}</td>
//                         <td>{p.duration}</td>
//                         <td><StatusBadge status={p.status} /></td>
//                       </tr>
//                     )) : (
//                       <tr><td colSpan="4" className="no-data">No assigned projects yet</td></tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {bidProject && (
//         <div className="row mt-4">
//           <div className="col-12 col-sm-8">
//             <div className="dash-card">
//               <h5>Place a Bid — {bidProject.title}</h5>
//               <p className="text-secondary small">Placing a bid costs 10 tokens. It is not refunded if the client doesn't select you.</p>
//               <form onSubmit={handleSubmit(submitBid)}>
//                 <div className="row g-3">
//                   <div className="col-12 col-sm-6">
//                     <label className="form-label">Your Quoted Price (₹)</label>
//                     <input type="text" className="form-control" {...register('amount', { required: true })} />
//                     {errors.amount && <div className="text-danger small">Required</div>}
//                   </div>
//                   <div className="col-12 col-sm-6">
//                     <label className="form-label">Delivery Duration</label>
//                     <input type="text" className="form-control" placeholder="e.g. 2 weeks" {...register('duration', { required: true })} />
//                     {errors.duration && <div className="text-danger small">Required</div>}
//                   </div>
//                   <div className="col-12">
//                     <label className="form-label">Proposal</label>
//                     <textarea className="form-control" rows="4" {...register('proposal', { required: true })} />
//                     {errors.proposal && <div className="text-danger small">Required</div>}
//                   </div>
//                   <div className="col-12">
//                     <button type="submit" className="btn btn-orange me-2">Submit Bid</button>
//                     <button type="button" className="btn btn-outline-secondary" onClick={() => setBidProject(null)}>Cancel</button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default UserProjects

import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import StatusBadge from "../common/StatusBadge";

const UserProjects = () => {
  const [tab, setTab] = useState("open");
  const [openProjects, setOpenProjects] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [bidProject, setBidProject] = useState(null);

  // Reference for the complete bid form
  const bidFormRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  // Fetch projects when component loads
  useEffect(() => {
    fetchOpen();
    fetchMine();
  }, []);

  // Fetch open projects
  const fetchOpen = async () => {
    try {
      const res = await axiosInstance.get("/developer-open-projects");

      setOpenProjects(res?.data?.result || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch my assigned projects
  const fetchMine = async () => {
    try {
      const res = await axiosInstance.get("/developer-my-projects");

      setMyProjects(res?.data?.result || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Open bid form
  const openBidForm = (project) => {
    setBidProject(project);

    // Clear previous form data
    reset({
      amount: "",
      duration: "",
      proposal: "",
    });
  };

  /*
    This runs AFTER bidProject is updated
    and the bid form is rendered on the page.
  */
  useEffect(() => {
    if (!bidProject) return;

    // Wait for the DOM to render
    requestAnimationFrame(() => {
      // Scroll to bid form
      bidFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Put cursor directly in amount input
      setFocus("amount");
    });
  }, [bidProject, setFocus]);

  // Submit bid
  const submitBid = async (data) => {
    try {
      const res = await axiosInstance.post("/developer-place-bid", {
        projectId: bidProject._id,
        amount: data.amount,
        duration: data.duration,
        proposal: data.proposal,
      });

      if (res?.data?.success) {
        Swal.fire({
          title: "Bid",
          text: res?.data?.message,
          icon: "success",
        });

        // Close bid form
        setBidProject(null);

        // Refresh open projects
        fetchOpen();
      } else {
        Swal.fire({
          title: "Bid",
          text: res?.data?.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="container py-5">
      {/* =========================
          PAGE HEADING
      ========================== */}
      <div className="mb-4">
        <h2 className="fw-bold">Developer Dashboard</h2>

        <p className="text-secondary">Find projects and place your bids.</p>
      </div>

      {/* =========================
          TABS
      ========================== */}
      <div className="mb-4">
        <button
          className={`btn me-2 ${tab === "open" ? "btn-orange" : "btn-outline-secondary"
            }`}
          onClick={() => setTab("open")}
        >
          Open Projects
        </button>

        <button
          className={`btn ${tab === "mine" ? "btn-orange" : "btn-outline-secondary"
            }`}
          onClick={() => setTab("mine")}
        >
          My Projects
        </button>
      </div>

      {/* =====================================================
          OPEN PROJECTS
      ====================================================== */}
      {tab === "open" && (
        <div className="row">
          <div className="col-12">
            <div className="dash-card">
              <h5 className="mb-3">Available Projects</h5>

              {openProjects.length > 0 ? (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Duration</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {openProjects.map((p) => (
                        <tr key={p._id}>
                          <td>{p.title}</td>

                          <td>{p.des}</td>

                          <td>₹{p.budget}</td>

                          <td>{p.duration}</td>

                          <>
                            <button
                              className="btn btn-sm btn-orange"
                              onClick={() => openBidForm(p)}
                            >
                              Place Bid
                            </button>
              
                       </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-secondary mb-0">
                    No open projects available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MY PROJECTS
      ====================================================== */}
      {tab === "mine" && (
        <div className="row">
          <div className="col-12">
            <div className="dash-card">
              <h5 className="mb-3">My Assigned Projects</h5>

              {myProjects.length > 0 ? (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Duration</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {myProjects.map((p) => (
                        <tr key={p._id}>
                          <td>{p.title}</td>

                          <td>{p.des}</td>

                          <td>₹{p.budget}</td>

                          <td>{p.duration}</td>

                          <td>
                            <StatusBadge status={p.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-secondary mb-0">
                    No assigned projects found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          BID FORM
      ====================================================== */}
      {bidProject && (
        <div className="row mt-4" ref={bidFormRef}>
          <div className="col-12 col-sm-8">
            <div className="dash-card">
              <h5>Place a Bid — {bidProject.title}</h5>

              <p className="text-secondary small">
                Placing a bid costs 10 tokens. It is not refunded if the client
                doesn't select you.
              </p>

              {/* =========================
                  BID FORM
              ========================== */}
              <form onSubmit={handleSubmit(submitBid)}>
                <div className="row g-3">
                  {/* =========================
                      AMOUNT
                  ========================== */}
                  <div className="col-12 col-sm-6">
                    <label className="form-label">Your Quoted Price (₹)</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your price"
                      {...register("amount", {
                        required: true,
                      })}
                    />

                    {errors.amount && (
                      <div className="text-danger small">Required</div>
                    )}
                  </div>

                  {/* =========================
                      DURATION
                  ========================== */}
                  <div className="col-12 col-sm-6">
                    <label className="form-label">Delivery Duration</label>

                    <input
                      type="text" className="form-control" placeholder="e.g. 2 weeks"
                      {...register("duration", {required: true,})}/>
                    {errors.duration && (<div className="text-danger small">Required</div>)}</div>

                  {/* =========================
                      PROPOSAL
                  ========================== */}
                  <div className="col-12">
                    <label className="form-label">Proposal</label>

                    <textarea
                      className="form-control" rows="4"placeholder="Write your proposal..."{...register("proposal", {required: true,})}/>
                    {errors.proposal && (<div className="text-danger small">Required</div>)} </div>

                  {/* =========================
                      BUTTONS
                  ========================== */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-orange me-2">  Submit Bid</button>

                    <button type="button" className="btn btn-outline-secondary" onClick={() => {  
                       setBidProject(null);reset({amount: "",duration: "",proposal: "",}); }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProjects;
