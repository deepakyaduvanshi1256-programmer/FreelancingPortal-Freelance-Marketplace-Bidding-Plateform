import React from 'react'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";

const TrendingSection = () => {
  return (
    <>

      <div className="row py-3 trending">
        <div className='col-sm-10 mx-auto'>
          <div className='webheading'>Trending <b className='text-color1'>Contracts</b></div>
          <hr className='w-25 mx-auto text-color1' />
          <div className="row">

            <div className="col-sm-3">
              <div className='card shadow-lg mx-auto border border-0 trendingcard position-relative p-2'>
                <img src="/public/images/course-04-590x430.jpg" alt="" className='img-fluid' />
                <span className='badge bg-color-1 position-absolute'>Fixed Priced</span>
                <h6 className='m-0 pt-2'>E-Commerce Website</h6>
                <p className='m-0 trendingstar'>
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  (5.0/499 ratings)
                </p>
                <p className='text-danger m-0 trendingprice'>Rs.1,11,111/-</p>
                <div>
                  <span className='float-start'>8 bids</span>
                  <span className='float-end'> 45 views</span>
                </div>
                <Link className='btn bg-color-1 w-50 p-0 mt-1 text-light herobtn'>Place Bid</Link>
              </div>
            </div>

            <div className="col-sm-3">
              <div className='card shadow-lg mx-auto border border-0 trendingcard position-relative p-2'>
                <img src="/public/images/course-04-590x430.jpg" alt="" className='img-fluid' />
                <span className='badge bg-color-1 position-absolute'>Fixed Priced</span>
                <h6 className='m-0 pt-2'>E-Commerce Website</h6>
                <p className='m-0 trendingstar'>
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  (5.0/499 ratings)
                </p>
                <p className='text-danger m-0 trendingprice'>Rs.1,11,111/-</p>
                <div>
                  <span className='float-start'>8 bids</span>
                  <span className='float-end'> 45 views</span>
                </div>
                <Link className='btn bg-color-1 w-50 p-0 mt-1 text-light herobtn'>Place Bid</Link>
              </div>
            </div>

            <div className="col-sm-3">
              <div className='card shadow-lg mx-auto border border-0 trendingcard position-relative p-2'>
                <img src="/public/images/course-04-590x430.jpg" alt="" className='img-fluid' />
                <span className='badge bg-color-1 position-absolute'>Fixed Priced</span>
                <h6 className='m-0 pt-2'>E-Commerce Website</h6>
                <p className='m-0 trendingstar'>
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  (5.0/499 ratings)
                </p>
                <p className='text-danger m-0 trendingprice'>Rs.1,11,111/-</p>
                <div>
                  <span className='float-start'>8 bids</span>
                  <span className='float-end'> 45 views</span>
                </div>
                <Link className='btn bg-color-1 w-50 p-0 mt-1 text-light herobtn'>Place Bid</Link>
              </div>
            </div>

            <div className="col-sm-3">
              <div className='card shadow-lg mx-auto border border-0 trendingcard position-relative p-2'>
                <img src="/public/images/course-04-590x430.jpg" alt="" className='img-fluid' />
                <span className='badge bg-color-1 position-absolute'>Fixed Priced</span>
                <h6 className='m-0 pt-2'>E-Commerce Website</h6>
                <p className='m-0 trendingstar'>
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  <FaStar className='text-warning' />
                  (5.0/499 ratings)
                </p>
                <p className='text-danger m-0 trendingprice'>Rs.1,11,111/-</p>
                <div>
                  <span className='float-start'>8 bids</span>
                  <span className='float-end'> 45 views</span>
                </div>
                <Link className='btn bg-color-1 w-50 p-0 mt-1 text-light herobtn'>Place Bid</Link>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default TrendingSection