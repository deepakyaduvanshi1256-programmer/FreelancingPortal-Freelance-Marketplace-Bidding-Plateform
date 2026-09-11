import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axiosInstance from '../../utils/axiosInstance'
import { updateStoredUser } from '../../utils/auth'

const UserPlans = () => {
  const [plans, setPlans] = useState([])
  const [credit, setCredit] = useState(0)

  useEffect(() => {
    fetchPlans()
    fetchCredit()
  }, [])

  const fetchPlans = async () => {
    try {
      const res = await axiosInstance.get('/plans')
      setPlans(res?.data?.result || [])
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCredit = async () => {
    try {
      const res = await axiosInstance.get('/profile')
      setCredit(res?.data?.result?.credit || 0)
    } catch (error) {
      console.log(error)
    }
  }

  const buyPlan = async (planId) => {
    try {
      const res = await axiosInstance.post('/developer-buy-plan', { planId })
      if (res?.data?.success) {
        Swal.fire({ title: 'Plan', text: res?.data?.message, icon: 'success' })
        setCredit(res?.data?.result?.credit || 0)
        updateStoredUser(res?.data?.result)
      } else {
        Swal.fire({ title: 'Plan', text: res?.data?.message, icon: 'error' })
      }
    } catch (error) {
      Swal.fire({ title: 'Error', text: error.response?.data?.message || 'Something went wrong', icon: 'error' })
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora for Freelancers</span>
          <h2 className="dash-heading">Token Plans</h2>
          <p className="text-secondary">Current balance: <strong>{credit} tokens</strong> · 10 tokens = 1 bid</p>
        </div>
      </div>

      <div className="row g-3">
        {plans.length > 0 ? plans.map((plan) => (
          <div className="col-12 col-sm-4" key={plan._id}>
            <div className="dash-card h-100 text-center">
              <h4>{plan.name}</h4>
              <h2 className="text-orange">₹{plan.price}</h2>
              <p className="text-secondary">{plan.tokens} tokens</p>
              <p className="small">{plan.description}</p>
              <button className="btn btn-orange w-100" onClick={() => buyPlan(plan._id)}>Buy Now</button>
            </div>
          </div>
        )) : (
          <div className="col-12">
            <p className="text-muted">No plans available right now. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPlans
