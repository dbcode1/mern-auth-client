import React, {useState} from 'react'
import Layout from '../main/Layout'
import axios from 'axios'
import {isAuth} from './helpers'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Forgot = ({history}) => {
  const [values, setValues] = useState({
    email:'dmbrusky@gmail.com',
    buttonText: 'Request Reset Password Link'
  })

  const {email, buttonText} = values

  const handleChange = (name) => (event) => {
    console.log(event.target.value)
    setValues({ ...values, [name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({...values, buttonText: 'Submitting'})
    axios({
      method: 'PUT', 
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: {email}
    })
    .then(response => {
      console.log('Forgot Password SUCCESS', response)
      toast.success(response.data.message)
      setValues({...values, buttonText: 'Requested'})
      
    }).catch(error => {
      console.log('SIGNIN ERROR', error.response.data)
      setValues({ ...values, buttonText: 'Submit'})
      toast.error(error.response.data.error)

    })
  }

  const passwordForgotForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input className="form-control" type="text" value={email} onChange={handleChange('email')}></input>
      </div>
      <div>
        <button className=" btn btn-primary" onClick={handleSubmit}>{buttonText}</button>
      </div>
    </form>
  )

  return (
  <Layout>
    <div className="col-md-6 offset-md-3">
  
      <ToastContainer />
      <h1 className="p-5 text-center">Forgot Password</h1>
      {passwordForgotForm()}
    </div>
  </Layout>
  )
}

export default Forgot