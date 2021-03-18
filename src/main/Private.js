import React, {useEffect, useState} from 'react'
import Layout from '../main/Layout'
import axios from 'axios'
import { isAuth, getCookie, signout, updateUser} from '../auth/helpers'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import styled from 'styled-components'
import DataForm from './../styledComponents/DataForm';
import Button from './../styledComponents/Button';
import DataField from './../styledComponents/DataField'
import DataCard from './../styledComponents/DataCard'
import Fade from "../Fade";

const PrivateForm = styled(DataForm)`
  margin-top: 100px;
`
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

const Private = ({history}) => {
  const [values, setValues] = useState({
    role: '',
    name: '',
    email:'',
    password: '',
    buttonText: 'Submit'
  })

  const token = getCookie('token')

  const [show, setShow] = useState(false);

  useEffect(() => {
    setValues({...values, loading: false});
    setShow(show => !show)
    loadProfile()
  }, [])

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
      url: `${process.env.REACT_APP_API}/user/update`,
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
    <PrivateForm>
      <p> Profile Update</p>
      <DataField>
        <label>Role</label>
        <input defaultValue={role} type="text" disabled ></input>
      </DataField>
      <DataField>
        <label>Name</label>
        <input type="text" value={name} onChange={handleChange('name')}></input>
      </DataField>
      <DataField>
        <label>Email</label>
        <input defaultValue={email} type="text" value={email} disabled ></input>
      </DataField>
      <DataField>
        <label>Password</label>
        <input type="text" value={password} onChange={handleChange('password')}></input>
      </DataField>
      <DataField>
        <SubmitButton  onClick={handleSubmit}>{buttonText}</SubmitButton>
      </DataField>
    </PrivateForm>
  )

  return (
  <Layout>
    <Fade show={show}>
      <ToastContainer />
      {updateForm()}
    </Fade>
  </Layout>
  )
}

export default Private