import React, { useEffect, useState } from 'react'
import { FaCheck, FaTimes, FaUser } from 'react-icons/fa'
import Swal from 'sweetalert2'
import axiosInstance from '../../utils/axiosInstance'

const ClientReviewBids = () => {
  const [projects, setProjects] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [bids, setBids] = useState([])

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedProjectId) fetchBids(selectedProjectId)
    else setBids([])
  }, [selectedProjectId])

  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get('/client-post-list')
      const list = res?.data?.result || []
      setProjects(list)
      if (list.length > 0) setSelectedProjectId(list[0]._id)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBids = async (projectId) => {
    try {
      const res = await axiosInstance.get('/client-project-bids', { params: { projectId } })
      setBids(res?.data?.result || [])
    } catch (error) {
      console.log(error)
      setBids([])
    }
  }

  const acceptBid = async (bidId) => {
    const confirm = await Swal.fire({
      title: 'Accept this bid?',
      text: 'The project will be assigned and every other pending bid will be auto-rejected.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept',
    })
    if (!confirm.isConfirmed) return
    try {
      const res = await axiosInstance.post('/client-accept-bid', { bidId })
      if (res?.data?.success) {
        Swal.fire({ title: 'Bid', text: res?.data?.message, icon: 'success' })
        fetchBids(selectedProjectId)
      } else {
        Swal.fire({ title: 'Bid', text: res?.data?.message, icon: 'error' })
      }
    } catch (error) {
      Swal.fire({ title: 'Error', text: error.response?.data?.message || 'Something went wrong', icon: 'error' })
    }
  }

  const rejectBid = async (bidId) => {
    try {
      const res = await axiosInstance.post('/client-reject-bid', { bidId })
      if (res?.data?.success) {
        Swal.fire({ title: 'Bid', text: res?.data?.message, icon: 'success' })
        fetchBids(selectedProjectId)
      } else {
        Swal.fire({ title: 'Bid', text: res?.data?.message, icon: 'error' })
      }
    } catch (error) {
      Swal.fire({ title: 'Error', text: error.response?.data?.message || 'Something went wrong', icon: 'error' })
    }
  }

  const selectedProject = projects.find(p => p._id === selectedProjectId)

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora for Clients</span>
          <h2 className="dash-heading">Review Candidate Proposals</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="dash-card">
            <div className="row mb-3">
              <div className="col-12 col-sm-6">
                <label className="form-label">Select Project</label>
                <select className="form-select" value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)}>
                  {projects.length === 0 && <option value="">No projects posted yet</option>}
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>{p.title} · {p.status}</option>
                  ))}
                </select>
              </div>
              {selectedProject && (
                <div className="col-12 col-sm-6 d-flex align-items-end">
                  <p className="text-secondary mb-0">
                    <strong>Budget:</strong> ₹{selectedProject.budget} &nbsp;|&nbsp; <strong>Status:</strong> {selectedProject.status}
                  </p>
                </div>
              )}
            </div>

            <div className="row g-3">
              {bids.length === 0 ? (
                <div className="col-12">
                  <p className="text-muted mb-0">No bids on this project yet.</p>
                </div>
              ) : (
                bids.map((bid) => (
                  <div className="col-12 col-sm-6" key={bid._id}>
                    <div className="proposal-card h-100">
                      <div className="row align-items-center g-2 mb-2">
                        <div className="col-auto">
                          <FaUser className="text-orange" />
                        </div>
                        <div className="col">
                          <h6 className="mb-0 fw-bold">{bid?.developer?.name || 'Unknown'}</h6>
                        </div>
                        <div className="col-auto">
                          <span className="job-budget">₹{bid.amount}</span>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-12">
                          <p className="text-secondary small mb-0">{bid?.developer?.headline || bid?.developer?.skill || ''}</p>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-12">
                          <p className="job-card-desc mb-0">&quot;{bid.proposal}&quot;</p>
                        </div>
                      </div>
                      <div className="row g-2">
                        {bid.status === 'pending' ? (
                          <>
                            <div className="col-auto">
                              <button type="button" className="btn btn-sm btn-orange" onClick={() => acceptBid(bid._id)}><FaCheck /> Accept</button>
                            </div>
                            <div className="col-auto">
                              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => rejectBid(bid._id)}><FaTimes /> Reject</button>
                            </div>
                          </>
                        ) : (
                          <div className="col-12">
                            <span className={bid.status === 'accepted' ? 'active' : 'inactive'}>
                              {bid.status === 'accepted' ? 'Accepted' : 'Rejected'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientReviewBids
