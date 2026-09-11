import React from 'react'

const ArticleSection = () => {
  return (
    <>


      <div className="container py-5 article">

        <div className="webheading text-center">
          Latest <b className="text-color1">Articles</b>
          <h1>Zentora Insights & Updates</h1>
        </div>

        <hr className="w-25 mx-auto text-color1" />

        <div className="row g-3">

          <div className="col-sm-4">
            <div className="card border-0 shadow-lg">
              <img
                src="/images/course-79-750x750.jpg"
                className="img-fluid article-img"
                alt=""
              />
              <div className="article-content p-5">
                <p>SCIENCE</p>
                <h3>Crafting Effective Learning Guide Line</h3>
                <p>15 Nov, 2023</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, deleniti.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card border-0 shadow-lg">
              <img
                src="/images/course-09-750x750.jpg"
                className="img-fluid article-img"
                alt=""
              />
               <div className="article-content p-5">
                <p>SCIENCE</p>
                <h3>Crafting Effective Learning Guide Line</h3>
                <p>15 Nov, 2023</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, deleniti.
                </p>
              </div>
            </div>
          </div>

          <div className="col-sm-4 position-relative">
            <div className="card border-0 shadow-lg">
              <img
                src="/images/course-07-750x750.jpg"
                className="img-fluid article-img"
                alt=""
              />
               <div className="article-content p-5">
                <p>SCIENCE</p>
                <h3>Crafting Effective Learning Guide Line</h3>
                <p>15 Nov, 2023</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, deleniti.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>





    </>
  )
}

export default ArticleSection