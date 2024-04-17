import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    userName: "",
    email: "",
    phone: "",
    password: ""
  })
  const getInputData = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const postData = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.post("http://localhost:8000/api/user", data)
      console.log(res);
      if (res.status === 200)
        navigate("/login")

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="blue_bg mt-5 ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className='text-center'>Create An Account</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">

          </div>
          <div className="col-md-6 ">
            <form action="" >
              <div className="">
                <div className='col'>
                  <label htmlFor=""> Name <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='name' onChange={getInputData} required placeholder=" Name" />
                </div>
                <div className='col'>
                  <label htmlFor=""> User Name <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='userName' onChange={getInputData} required placeholder=" User Name" />
                </div>
                <div className='col'>
                  <label htmlFor=""> email <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='email' onChange={getInputData} required placeholder=" email address" />
                </div>
              </div>
              <div className="">
                <div className='col'>
                  <label htmlFor=""> phone <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='phone' onChange={getInputData} required placeholder=" phone Name " />
                </div>
                <div className='col'>
                  <label htmlFor=""> password <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='password' onChange={getInputData} required placeholder=" password " />
                </div>
              </div>
              <div>
                <button className='btn  mt-2 mb-3 text-light text-center w-100' onClick={postData} style={{ backgroundColor: "#183661" }}>sing up </button>
              </div>
            </form>

          </div>
          <div className="col-md-3">

          </div>
        </div>
      </div>
    </>
  )
}

export default Signup