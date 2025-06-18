import { useNavigate } from 'react-router'
import Notfound from '../../assets/Hero Image.png'
import img2 from "../../assets/Rectangle 62.png"

import { Link } from "react-router";

export default function NotFound() {
  let navg=useNavigate()
  return (
    <>
    <nav className="" >
  <div className="container-fluid">
    <Link className="navbar-brand" to='/Home'><img src={img2} alt="logo" className="p-4 w-25"/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
        </div>
      </nav>
      
      <div className="conatiner-fluid " dir='ltr'>
      <div className="container">
        <div className="row">
            <div className="col-lg-3 my-auto text-center ">
              <div className=" w-75 mx-auto mt-5 ">
                <h1 style={{fontSize:"45px"}}>عذرًا لقد حدث خطأ</h1>
              </div>
              <div className="">
                <button className='btn btn-success rounded-pill my-4 text-center '  type='submit' onClick={() => { navg("/") }}>العودة الي الصفحة الرئيسة</button>
              </div>
          </div>
          <div className="col-lg-9">
            <div className="">
              <img src={Notfound} alt="notfound" className='w-100' style={{height:"550px"}} />
            </div>
          </div>
        </div>
      </div>
      </div>

    </>
  )
}
