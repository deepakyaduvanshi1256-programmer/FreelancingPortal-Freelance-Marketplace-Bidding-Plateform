import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axiosInstance from '../../utils/axiosInstance'
import StatusBadge from '../common/StatusBadge'

const ClientManageProjects = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/client-post-list')
      setData(res?.data?.result || [])
    } catch (error) {
      console.log(error)
      setData([])
    }
  }

  const updateStatus = async (projectId, status) => {
    try {
      const res = await axiosInstance.post('/client-update-project-status', { projectId, status })
      if (res?.data?.success) {
        Swal.fire({ title: 'Project', text: res?.data?.message, icon: 'success' })
        fetchData()
      } else {
        Swal.fire({ title: 'Project', text: res?.data?.message, icon: 'error' })
      }
    } catch (error) {
      Swal.fire({ title: 'Error', text: error.response?.data?.message || 'Something went wrong', icon: 'error' })
    }
  }

  const confirmCancel = async (projectId) => {
    const confirm = await Swal.fire({
      title: 'Cancel this project?',
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it',
    })
    if (confirm.isConfirmed) updateStatus(projectId, 'cancelled')
  }

  const renderActions = (item) => {
    switch (item.status) {
      case 'open':
        return <span className="text-muted">Waiting for bids</span>
      case 'assigned':
        return (
          <>
            <button type="button" className="action-btn action-btn-primary" onClick={() => updateStatus(item._id, 'in_progress')}>Start Work</button>
            <button type="button" className="action-btn-delete" onClick={() => confirmCancel(item._id)}>Cancel</button>
          </>
        )
      case 'in_progress':
        return (
          <>
            <button type="button" className="action-btn action-btn-primary" onClick={() => updateStatus(item._id, 'completed')}>Mark Completed</button>
            <button type="button" className="action-btn-delete" onClick={() => confirmCancel(item._id)}>Cancel</button>
          </>
        )
      default:
        return <span className="text-muted">-</span>
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora for Clients</span>
          <h2 className="dash-heading">Your Posted Projects</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="dash-card">
            <div className="row mb-3">
              <div className="col-12">
                <h4>Your Posted Projects</h4>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table dash-table mb-0">
                    <thead>
                      <tr>
                        <th>Project Title</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Timeline</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? data.map((item) => (
                        <tr key={item._id}>
                          <td>{item?.title}</td>
                          <td>{item?.des}</td>
                          <td>{item?.budget}</td>
                          <td>{item?.duration}</td>
                          <td><StatusBadge status={item?.status} /></td>
                          <td>{renderActions(item)}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="6" className="no-data">No Projects Posted Yet</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientManageProjects
