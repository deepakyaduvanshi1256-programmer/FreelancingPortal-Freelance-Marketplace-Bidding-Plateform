import React, { useEffect, useState } from 'react'
import { FaUserTie, FaBuilding, FaBriefcase } from "react-icons/fa";
import axiosInstance from '../../utils/axiosInstance'

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ users: 0, clients: 0, liveProjects: 0 })

  useEffect(() => {
    fetchCounts()
  }, [])

  const fetchCounts = async () => {
    try {
      const [usersRes, clientsRes, projectsRes] = await Promise.all([
        axiosInstance.get('/admin-user-list'),
        axiosInstance.get('/admin-client-list'),
        axiosInstance.get('/admin-project-list'),
      ])
      const users = usersRes?.data?.result || []
      const clients = clientsRes?.data?.result || []
      const projects = projectsRes?.data?.result || []
      const liveProjects = projects.filter(p => p.status === 'open' || p.status === 'assigned' || p.status === 'in_progress').length
      setCounts({ users: users.length, clients: clients.length, liveProjects })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="row Admin container-fluid">
        <h4 className='text-danger'>Zentora Admin</h4>
        <h1>Admin Management Dashboard</h1>
        <div className="col-sm-12 card border-0 shadow-lg">
          <div className="row ">
            <div className="col-sm-4">
              <div className='card border-0 '>
                <div className="row px-2 Admin1 Admin3">
                  <div className="col-sm-3">
                    <div>
                      <FaUserTie className='fs-1 mt-5' />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <h3 className='fs-4 mt-3 mb-0'>{counts.users}</h3>
                    <h6 >Total Freelancers</h6>
                    <div className='mb-3'>Registered on Platform</div>
                  </div>
                  <div className="col-sm-2 mt-2 live">Live</div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className='card border-0 '>
                 <div className='card border-0 '>
                <div className="row px-2 Admin2 Admin3">
                  <div className="col-sm-3">
                    <div>
                      <FaBuilding className='fs-1 mt-5' />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <h3 className='fs-4 mt-3 mb-0'>{counts.clients}</h3>
                    <h6 >Active Clients</h6>
                    <div className='mb-3'>Hiring on Zentora</div>
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
                      <FaBriefcase className='fs-1 mt-5' />
                    </div>
                  </div>
                  <div className="col-sm-7 ">
                    <h3 className='fs-4 mt-3 mb-0'>{counts.liveProjects}</h3>
                    <h6 >Live Projects</h6>
                    <div className='mb-3'>Open, assigned or in progress</div>
                  </div>
                 
                </div>
              </div>

              </div>
            </div>

          </div>
          <h5>Recent Administration Log</h5>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
