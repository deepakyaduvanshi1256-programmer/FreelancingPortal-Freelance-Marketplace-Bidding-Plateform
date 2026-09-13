import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <>
    
    <div className="row">
      <div className="col-sm-12 hero bg-color-2">
        <div className="row ps-5">
          <div className="col-sm-6 position-relative ">
            <h3 className='herotitle'>Where Talent <b className='text-color1'>Meets <br></br>Opportunity </b>With<br></br> Zentora</h3>
            <p className='herodes'>Lorem ipsum, dolor sit amet consectetur<br></br> adipisicing elit. Quaerat ipsum dolorum  nisi <br></br>nostrum quia fuga minima tempora deleniti  <br></br> aliquam sed.</p>
            <Link className="btn bg-color-1 mb-2 pt-3 text-light herobtn">Browse Job And Project</Link>
            <img src="/images/shape-13.png" alt="" className='herodot position-absolute ' />
          </div>
          
          <div className="col-sm-6">
            <img src="/images/girl-1.webp" alt="" className='img-fluid w-75'/>
            <img src="/public/images/h-1-shape-01.png" alt="" className='position-absolute herosideimg'/>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default HeroSection