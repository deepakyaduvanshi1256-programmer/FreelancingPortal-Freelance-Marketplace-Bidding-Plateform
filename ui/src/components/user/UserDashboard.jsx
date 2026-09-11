import React, { useEffect, useState } from 'react'
import { FaWallet, FaGavel, FaCoins } from "react-icons/fa";
import axiosInstance from '../../utils/axiosInstance'

const UserDashboard = () => {
  const [stats, setStats] = useState({ credit: 0, bidsPlaced: 0, assignedProjects: 0, name: '' })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [profileRes, bidsRes, projectsRes] = await Promise.all([
        axiosInstance.get('/profile'),
        axiosInstance.get('/developer-my-bids'),
        axiosInstance.get('/developer-my-projects'),
      ])
      const profile = profileRes?.data?.result || {}
      const bids = bidsRes?.data?.result || []
      const projects = projectsRes?.data?.result || []
      setStats({
        credit: profile.credit || 0,
        bidsPlaced: bids.length,
        assignedProjects: projects.length,
        name: profile.name || '',
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="row Admin container-fluid">
        <h4 className='text-danger'>Zentora for Freelancers</h4>
        <h1>Talent Dashboard</h1>
        <div className="col-sm-12 card border-0 shadow-lg">
          <div className="row ">
            <div className="col-sm-4">
              <div className='card border-0 '>
                <div className="row px-2 Admin1 Admin3">
                  <div className="col-sm-3">
                    <div>
                      <FaCoins className='fs-1 mt-5' />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <h3 className='fs-4 mt-3 mb-0'>{stats.credit}</h3>
                    <h6 >Tokens Left</h6>
                    <div className='mb-3'>Wallet balance</div>
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
                      <FaGavel className='fs-1 mt-5' />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <h3 className='fs-4 mt-3 mb-0'>{stats.bidsPlaced}</h3>
                    <h6 >Bids Placed</h6>
                    <div className='mb-3'>Total across all projects</div>
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
                      <FaWallet className='fs-1 mt-5' />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <h3 className='fs-4 mt-3 mb-0'>{stats.assignedProjects}</h3>
                    <h6 >Active/Won Projects</h6>
                    <div className='mb-3'>Assigned to you</div>
                  </div>
                 
                </div>
               
              </div>

              </div>
            </div>

          </div>
          <h4 className='px-2'>Welcome Back{stats.name ? `, ${stats.name}` : ''}!</h4>
          <p className='px-2 mb-5'>Your Zentora dashboard is ready. Use tokens to place bids — <b>10 tokens = 1 bid</b>. Buy more tokens from Plans when you run low.</p>
        </div>
        
      </div>
    </>
  )
}

export default UserDashboard
