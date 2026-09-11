import React from 'react'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";

const TestimonalSection = () => {
  return (
     <>
    
    <div className="row py-3 testimonial">
      <div className='col-sm-10 mx-auto'>
         <div className='webheading'>Our <b className='text-color1'>Testimonials</b></div>
          <hr className='w-25 mx-auto text-color1' />
          <div className="row">
            <div className="col-sm-6">
              <span>TESTIMONIALS</span>
              <h3 className='teathead'>What our Zentora <br></br> Community Says</h3>
               <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas veniam consectetur
                 Modi officiis animi doloribus voluptate odio dolores ullam similique aut eveniet, unde 
                 suscipit dolorem rerum, tenetur quis assumenda nulla.</p> 
                 <Link className='bg-color-1 text-light px-4 py-2'>View All</Link>
            </div>
            <div className="col-sm-3">
              <div className='shadow-lg p-3'>
                <img src="/public/images/testimonial-04.jpg" alt="" className='img-fluid rounded-circle'/>
                <p className='textp'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, esse, enim voluptatem vitae sed ipsum 
                  odio a eaque dicta voluptatum!</p>
                  <p className='textstar'>
                  <FaStar className='text-warning'/>
                  <FaStar className='text-warning'/>
                  <FaStar className='text-warning'/>
                  <FaStar className='text-warning'/>
                  <FaStar className='text-warning'/>
                  </p>
                  <p className='m-0'>Er. Mr. Deepak Yadav</p>
                  <p className='m-0 textpost'>Software Engineer</p>

              </div>
            </div>
            <div className="col-sm-3">
              <div className='shadow-lg p-3'>
                <img src="/public/images/testimonial-03.png" alt="" className='img-fluid rounded-circle'/>
                <p className='textp'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, esse, enim voluptatem vitae sed ipsum 
                  odio a eaque dicta voluptatum!</p>
                  <p className='textstar'>
                  <FaStar className='text-warning'/>
                  <FaStar className='text-warning'/>
                  <FaStar className='text-warning'/>
                  <FaStar className='text-warning'/>
                  <FaStar className='text-warning'/>
                  </p>
                   <p className='m-0'>Er.Ms. Sadhana Yadav</p>
                   <p className='m-0 textpost'>Software Engineer</p>

              </div>
            </div>
          </div>

      </div>
    </div>
    
    </>
  )
}

export default TestimonalSection