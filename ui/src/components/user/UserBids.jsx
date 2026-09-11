import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import StatusBadge from '../common/StatusBadge'

const UserBids = () => {
  const [bids, setBids] = useState([])

  useEffect(() => {
    fetchBids()
  }, [])

  const fetchBids = async () => {
    try {
      const res = await axiosInstance.get('/developer-my-bids')
      setBids(res?.data?.result || [])
    } catch (error) {
      console.log(error)
      setBids([])
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora for Freelancers</span>
          <h2 className="dash-heading">My Bids</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="dash-card">
            <div className="table-responsive">
              <table className="table dash-table mb-0">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>My Quote</th>
                    <th>Duration</th>
                    <th>Tokens Used</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.length > 0 ? bids.map((b) => (
                    <tr key={b._id}>
                      <td>{b?.project?.title || 'Project removed'}</td>
                      <td>₹{b.amount}</td>
                      <td>{b.duration}</td>
                      <td>{b.tokensUsed}</td>
                      <td><StatusBadge status={b.status} /></td>
                    </tr>
                  )) : (
                    <tr><td colSpan="5" className="no-data">You haven't placed any bids yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBids
