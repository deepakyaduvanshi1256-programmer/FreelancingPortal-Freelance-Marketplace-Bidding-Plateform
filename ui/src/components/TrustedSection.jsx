import React from 'react'
import { FaCheck } from "react-icons/fa";
const TrustedSection = () => {
  return (
    <>

      <div className="row py-3 trusted">
        <div className='col-sm-10 mx-auto'>
          <div className='webheading'>Trusted By <b className='text-color1'>Teams</b></div>
          <hr className='w-25 mx-auto text-color1' />
          <div className="row">
            <div className="col-sm-6 position-relative pt-5">
              <img src="/public/images/about-01.webp" alt="" className='img-fluid rounded-3' />
              <div className='shadow-lg p-1 position-absolute w-50 trustedimg'>
                <img src="/public/images/Image-2.png" alt="" className='img-fluid rounded-3' /></div>
            </div>
            <div className="col-sm-6 trustediv">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto doloribus expedita molestiae 
              quidem nesciunt quia, harum odio sunt magni. Similique enim vero beatae nostrum est voluptatibus voluptate
               praesentium mollitia aliquam. Et culpa possimus error mollitia pariatur voluptatibus ipsam, cupiditate veniam
                hic! Dolorum consequatur, fugit recusandae laudantium corporis molestiae nesciunt maiores!</p>
                <p>
                  < FaCheck className='text-color1'/>  Export Freelancer <br></br>
                  < FaCheck className='text-color1'/>  Safe Escrow Payments <br></br>
                  < FaCheck className='text-color1'/>  24/7 Priority Support <br></br>
                </p>
          </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default TrustedSection