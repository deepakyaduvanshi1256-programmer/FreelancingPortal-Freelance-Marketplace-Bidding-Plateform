import React from 'react'
import { FaShareAlt } from "react-icons/fa";
const TalentSection = () => {
  return (
    <>
      <div className="row px-5 testimonial">
        <div className='col-sm-10 mx-auto'>
          <div className='webheading'>Top <b className='text-color1'>Talent</b></div>
          <h4 className='text-center talentt'> Featured Freelancers on Zentora</h4>
          <hr className='w-25 mx-auto text-color1' />
          <div className="row ">

            <div className="col-sm-3 position-relative ">
              <img src="/public/images/team-01.webp" alt="" className='toptl ' />
              <p ><FaShareAlt className='position-absolute shareb' /> </p>
              <h5 className='m-0 px-5'>Sadhana Yadav</h5>
              <p className='m-0 px-5  toptext'>UI/UX Designer</p>
            </div>

            <div className="col-sm-3 position-relative">
              <img src="/public/images/team-02.webp" alt="" className='toptl ' />
              <p ><FaShareAlt className='position-absolute shareb' /> </p>
              <h5 className='m-0 px-5'>Er. Deepak yadav</h5>
              <p className='m-0 px-5  toptext'>Web Developer</p>
            </div>

            <div className="col-sm-3 position-relative">
              <img src="/public/images/team-03.webp" alt="" className='toptl' />
              <p ><FaShareAlt className='position-absolute shareb' /> </p>
              <h5 className='m-0 px-5'>Veena Singh</h5>
              <p className='m-0 px-5  toptext'>Software Developer</p>
            </div>

            <div className="col-sm-3 position-relative">
              <img src="/public/images/team-04.webp" alt="" className='toptl' />
              <p ><FaShareAlt className='position-absolute shareb' /> </p>
              <h5 className='m-0 px-5'>Er. Abhishek Nishad</h5>
              <p className='m-0 px-5  toptext'>Web Developer</p>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default TalentSection