import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <div className="row footer  ">
        <div className="col-sm-1"></div>
        <div className="col-sm-2 p-4  footercall formp">
          <h4><FaCircleCheck className='text-danger fs-1 px-2'/>
            Ze<b className='text-danger'>ntora</b></h4>
          <p className='formhh'>Zentora — Where Talent Meets Opportunity. <br></br>The future of freelancing is here. Connect. Collaborate. Earn.</p>
          <p className='formhh'>
           <b> Add: </b>70-80 Upper St Norwich NR2</p>
           <p className='formhh'><b> Call: </b>+91 9044792856</p>
           <p className='formhh'><b> Email: </b>deepakyaduvanshi1256@gmail.com</p>
        </div>
        <div className="col-sm-1"></div>
        <div className="col-sm-2   footercall formp">
          <h4>Zentora Platform</h4>
          <p className='formh'>Lorem ipsum dolor sit amet.</p>
          <p className='formh'>Lorem ipsum dolor sit amet.</p>
          <p className='formh'>Lorem ipsum dolor sit amet.</p>
          <p className='formh'>Lorem ipsum dolor sit amet.</p>
          <p className='formh'>Lorem ipsum dolor sit amet.</p>
          <p className='formh'>Lorem ipsum dolor sit amet.</p>
        </div>
         <div className="col-sm-1"></div>
         
        <div className="col-sm-2   footercall formp  ">
          <h4>Links</h4>
          <p className='formh'>Contacts</p>
          <p className='formh'>Gallery</p>
          <p className='formh'>News / Articles</p>
          <p className='formh'>Login / Register</p>
          <p className='formh'>COming Soon</p>
          <p className='formh'>Login / Register</p>

        </div>
        
        <div className="col-sm-2 pt-3  footercal formp">
          <h4 className='formh'>Contact Us</h4>
          <p className='formh'>Enter your email address to register to our newsletter Subscription</p>
          <input type="text" placeholder='your email' className=' form-f bg-shadow-lg w-50'/> <button className='btn btn-info form-ff'>Subscribe</button>
        </div>
        
      </div>
      <div className="row pt-3">
        <div className="col-sm-3"></div>
        <div className="col-sm-6 px-5">
          <p>Copyright 2026 Zentora & <b className='text-danger'> Er. Deepak Yadav</b>— Hire. Work. Grow. All Rights Reserved</p>
        </div>
        <div className="col-sm-3"></div>
      </div>
    </>
  )
}

export default Footer