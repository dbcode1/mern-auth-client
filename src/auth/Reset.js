import React, {useEffect, useState} from 'react'
import Layout from '../main/Layout'
import axios from 'axios'
import {isAuth} from './helpers'
import jwt from 'jsonwebtoken'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import DataForm from './../styledComponents/DataForm';
import DataField from './../styledComponents/DataField'

const Reset = ({match}) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Reset Password'
  })

  useEffect(() => {
    let token = match.params.token
    let {name} = jwt.decode(token)
    if(token){
      setValues({...values, name, token})
    }
  }, [])

  const {name, token, newPassword, buttonText} = values

  const handleChange = event => {
    setValues({ ...values, newPassword: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({...values, buttonText: 'Submitting'})
    axios({
      method: 'PUT', 
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: {newPassword, resetPasswordLink:token}
    })
    .then(response => {
      console.log('RESET Password SUCCESS', response)
      toast.success(response.data.message)
      setValues({...values, buttonText: 'Done'})
      
    }).catch(error => {
      console.log('SIGNIN ERROR', error.response.data)
      setValues({ ...values, buttonText: 'Reset Password'})
      toast.error(error.response.data.error)

    })
  }

  const resetPasswordForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input className="form-control" type="password" value={newPassword} onChange={handleChange} placeholder="type new password " required  value={newPassword}></input>
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
      <h1 className="p-5 text-center">Hey {name}, type your new password.</h1>
      {resetPasswordForm()}
    </div>
  </Layout>
  )
}

export default Reset