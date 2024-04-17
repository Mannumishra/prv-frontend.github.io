import React, { useState } from 'react'
import axiox from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    userName: "",
    password: ""
  })

  const getInputData = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const postData = async (e) => {
    e.preventDefault()
    try {
      let res = await axiox.post("http://localhost:8000/api/user/login", data)
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token)
        // localStorage.setItem("userid",res.data.userid)
        console.log(sessionStorage.setItem('user', JSON.stringify(res.data.data)));
        if (res.data.data.role === "Admin") {
          window.location.href = "/adminhome"
        }

        else if(res.data.data.role === "Buyer"){
          window.location.href = "/singlepage"
        }
      }
      else
        alert("UN athorized person")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="blue_bg mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2 className='text-center'>Login</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className='col'>
              <label htmlFor=""> User Name Or Email ID <span className='text-danger'>*</span></label>
              <input type="text" className="form-control" name='userName' onChange={getInputData} required placeholder=" User Name" />
            </div>
            <div className='col'>
              <label htmlFor=""> Password <span className='text-danger'>*</span></label>
              <input type="text" className="form-control" name='password' onChange={getInputData} required placeholder=" Password" />
            </div>
            <div>
              <button className='btn  mt-2 mb-3 text-light text-center w-100' onClick={postData} style={{ backgroundColor: "#183661" }}>Login </button>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  )
}

export default Login