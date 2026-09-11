import React from 'react'

const Contact = () => {
  return (
    <>
    
    <div className="row py-3 contactus">
      <div className='col-sm-10 mx-auto'>
         <div className='webheading'>Contact <b className='text-color1'>Us</b></div>
          <hr className='w-25 mx-auto text-color1' />
          <div className="row">
            <div className="col-sm-8 mx-auto">
              <div className='row bg-color-1 py-5 rounded-3'>
                <div className="col-sm-5 text-light text-end">
                  <h4>Get in Touch :</h4>
                  <span className='h5'>hr@zentora.in</span>
                </div>
                <div className="col-sm-2">
                  <div className='rounded-circle shadow-lg p-2 contactor'>or</div>
                </div>
                <div className="col-sm-5 text-light ">
                    <h4>Call us via :</h4>
                  <span className='h5'>+91-9044792856</span>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>
    
    </>
  )
}

export default Contact