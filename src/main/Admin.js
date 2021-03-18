import React, {useEffect, useState} from 'react'
import Layout from '../main/Layout'
import axios from 'axios'
import { isAuth, getCookie, signout, updateUser} from '../auth/helpers'
import {ToastContainer, toast} from 'react-toastify'
import styled from 'styled-components'
import Button from './../styledComponents/Button';
import 'react-toastify/dist/ReactToastify.min.css'

const SubmitButton = styled(Button)`
  border: 2px solid royalblue;
  border-radius: 6px;
  color: royalblue;
  margin: 15px auto 0 auto;
  &:hover {
    background-color: white;
    color: cyan;
  }
`

const Admin = ({history}) => {
  const [values, setValues] = useState({
    role: '',
    name: '',
    email:'',
    password: '',
    buttonText: 'Submit'
  })

  const token = getCookie('token')

  useEffect(() => {
    loadProfile()
  }, []
  )

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Profile update', response)
      const {role, name, email} = response.data
      setValues({ ...values, role, name, email})
    })
    .catch (error => {
      console.log('Profile update error', error.response.data.error)
      if(error.response.status === 401){
        signout(() => {
          history.push('/')
        })
      }
    })
  }

  const { role, name, email, password, buttonText} = values

  const handleChange = (name) => (event) => {
    console.log(event.target.value)
    setValues({ ...values, [name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({...values, buttonText: 'Submitting'})
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/admin/update`,
      data: {name, password},
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('PROFILE UPDATE SUCCESS', response)
      updateUser(response, () => {
        setValues({...values,  buttonText: 'Submitted'})
        toast.success('Profile updated')
      })
      
    }).catch(error => {
      console.log('PROFILE UPDATE ERROR', error.response.data.error)
      setValues({ ...values, buttonText: 'Submit'})
      toast.error(error.response.data.error)
    })
  }

  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Role</label>
        <input defaultValue={role} className="form-control" type="text" disabled ></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input className="form-control" type="text" value={name} onChange={handleChange('name')}></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input defaultValue={email} className="form-control" type="text" value={email} disabled ></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input className="form-control" type="text" value={password} onChange={handleChange('password')}></input>
      </div>
      <div>
        <SubmitButton className=" btn btn-primary"  onClick={handleSubmit}>{buttonText}</SubmitButton>
      </div>
    </form>
  )

  return (
  <Layout>
    <div className="col-md-6 offset-md-3">
      <ToastContainer />
      <h1 className="p-5 text-center">Admin</h1>
      <p className="lead"> Profile Update</p>
      {updateForm()}
    </div>
  </Layout>
  )
}

export default Admin