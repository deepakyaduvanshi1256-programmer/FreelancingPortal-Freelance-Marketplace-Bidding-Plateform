import React, { useEffect, useState } from 'react'
import { FaBriefcase, FaComments, FaHandshake } from "react-icons/fa";
import axiosInstance from '../../utils/axiosInstance'

const ClientDashboard = () => {
  const [counts, setCounts] = useState({ posted: 0, bidsReceived: 0, completed: 0 })

  useEffect(() => {
    fetchCounts()
  }, [])

  const fetchCounts = async () => {
    try {
      const res = await axiosInstance.get('/client-post-list')
      const projects = res?.data?.result || []
      const completed = projects.filter(p => p.status === 'completed').length

      // Sum bids across all of this client's projects
      const bidCounts = await Promise.all(
        projects.map(p =>
          axiosInstance.get('/client-project-bids', { params: { projectId: p._id } })
            .then(r => (r?.data?.result || []).length)
            .catch(() => 0)
        )
      )
      const bidsReceived = bidCounts.reduce((a, b) => a + b, 0)

      setCounts({ posted: projects.length, bidsReceived, completed })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="row Admin container-fluid">
        <h4 className='text-danger'>Zentora for Clients</h4>
        <h1>Client Dashboard</h1>
        <div className="col-sm-12 card border-0 shadow-lg">
          <div className="row ">
            <div className="col-sm-4">
              <div className='card border-0 '>
                <div className="row px-2 Admin1 Admin3">
                  <div className="col-sm-3">
                    <div>
                      <FaBriefcase className='fs-1 mt-5' />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <h3 className='fs-4 mt-3 mb-0'>{counts.posted}</h3>
                    <h6 >Posted Projects</h6>
                    <div className='mb-3'>All your job listings</div>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className='card border-0 '>
                 <div className='card border-0 '>
                <div className="row px-2 Admin2 Admin3">
                  <div className="col-sm-3">
                    <div>
                      <FaComments className='fs-1 mt-5' />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <h3 className='fs-4 mt-3 mb-0'>{counts.bidsReceived}</h3>
                    <h6 >Bids Received</h6>
                    <div className='mb-3'>Across all projects</div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className='card border-0 '>
                 <div className='card border-0 '>
                <div className="row px-2 Admin1 Admin3">
                  <div className="col-sm-3">
                    <div>
                      <FaHandshake className='fs-1 mt-5' />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <h3 className='fs-4 mt-3 mb-0'>{counts.completed}</h3>
                    <h6 >Deals Finalized</h6>
                    <div className='mb-3'>Projects completed</div>
                  </div>
                 
                </div>
              </div>

              </div>
            </div>

          </div>
          <h4 className='px-2'>Active Hirings</h4>
          <p className='px-2 mb-5'>Click any project in Manage Projects to view full details and select a freelancer bid to finalize the deal.</p>
        </div>
        
      </div>
    </>
  )
}

export default ClientDashboard
