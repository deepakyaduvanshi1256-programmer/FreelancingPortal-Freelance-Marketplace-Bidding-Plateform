import React from 'react'
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
const Pricing = () => {
  return (
    <>
    <div className="row px-5 testimonial">
        <div className='col-sm-10 mx-auto'>
          <div className='webheading mt-5'>FREELANCER  <b className='text-color1'>PLANS</b></div>
          <h1 className='text-center talentt'> Buy Credits. Place Bids. Win Projects.</h1>
          <h6 className='talentt text-center'>Every bid costs 1 credit. Choose a plan, get monthly credits, and start bidding on projects. Clients post jobs for free — plans are for freelancers only.</h6>
          <hr className='w-25 mx-auto text-color1' />
          <div className="row g-3 ">
            <div className="col-sm-4 ">
              <div className='card border-0 shadow-lg px-3 princingborder'>
                <div className='fw-bold mt-3'>STARTER</div>
                <div className='fw-bold fs-3'>₹0 <span className='month'>/ month</span></div>
                 <p className='month'>For new freelancers getting started</p>
                 <div className=''>
                  <p className='fontsize '> <IoCheckmarkOutline className='text-danger fs-3'/> 10 bidding credits / month</p>
                  <p className='fontsize '> <IoCheckmarkOutline className='text-danger fs-3' /> Browse all open projects</p>
                  <p className='fontsize'> <IoCheckmarkOutline className='text-danger fs-3' /> Basic profile & portfolio</p>
                  <p className='fontsize'> <RxCross1 className=' fs-5' /> Priority bid visibility</p>
                  <p className='fontsize'> <RxCross1 className=' fs-5 mt-2' /> Bid analytics dashboard</p>
                 </div>
                 <button className='bg bg-info w-100 text-light btn mt-4 mb-2'>Current Plan</button>
                 <p className='month mx-5 mb-4'>10 credits included · 1 credit per bid</p>
              </div>
            </div>
            <div className="col-sm-4 ">
              <div className='card border-0 shadow-lg px-3 princingborder'>
                <div className='fw-bold mt-3'>STARTER</div>
                <div className='fw-bold fs-3'>₹499 <span className='month'>/ month</span></div>
                 <p className='month'>Best for active freelancers</p>
                 <div className=''>
                  <p className='fontsize '> <IoCheckmarkOutline className='text-danger fs-3'/> 50 bidding credits / month</p>
                  <p className='fontsize '> <IoCheckmarkOutline className='text-danger fs-3' /> Browse all open projects</p>
                  <p className='fontsize'> <IoCheckmarkOutline className='text-danger fs-3' /> Basic profile & portfolio</p>
                  <p className='fontsize'> <IoCheckmarkOutline className='text-danger fs-3' /> Priority bid visibility</p>
                  <p className='fontsize'> <RxCross1 className=' fs-5' /> Bid analytics dashboard</p>
                 </div>
                 <button className='bg bg-info w-100 text-light btnn mt-4 mb-3'>Get Pro Plan</button>
                 <p className='month mx-5'>50 credits included · 1 credit per bid</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className='card border-0 shadow-lg px-3 princingborder'>
                <div className='fw-bold mt-3'>STARTER</div>
                <div className='fw-bold fs-3'>₹1499 <span className='month'>/ month</span></div>
                 <p className='month'>For power users & small agencies</p>
                 <div className=''>
                  <p className='fontsize '> <IoCheckmarkOutline className='text-danger fs-3'/> 150 bidding credits / month</p>
                  <p className='fontsize '> <IoCheckmarkOutline className='text-danger fs-3' /> Browse all open projects</p>
                  <p className='fontsize'> <IoCheckmarkOutline className='text-danger fs-3' /> Basic profile & portfolio</p>
                  <p className='fontsize'> <IoCheckmarkOutline className='text-danger fs-3' /> Priority bid visibility</p>
                  <p className='fontsize'> <IoCheckmarkOutline className=' text-danger fs-3' /> Bid analytics dashboard</p>
                 </div>
                 <button className='bg bg-info w-100 text-light btnn mt-3 mb-3'>Get Pro Plan</button>
                 <p className='month mx-5'>150 credits included · 1 credit per bid</p>
              </div>
            </div>
            
          </div>
          </div>
          </div>
    
    </>
  )
}

export default Pricing