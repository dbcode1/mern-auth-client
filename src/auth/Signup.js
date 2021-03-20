import React, {useState} from 'react'
import { Link, Redirect} from 'react-router-dom'
import Layout from '../main/Layout'
import axios from 'axios'
import {isAuth} from './helpers'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import styled from 'styled-components'
import Button from './../styledComponents/Button';
import DataForm from './../styledComponents/DataForm';
import DataField from './../styledComponents/DataField'
import FormWrapper from '../styledComponents/FormWrapper'
import Submit from '../styledComponents/Submit'

const Signup = () => {
  const [values, setValues] = useState({
    name: 'Dan',
    email:'',
    password: '',
    buttonText: 'Submit'
  })

  const { name, email, password, buttonText} = values

  const handleChange = (name) => (event) => {
    console.log(event.target.value)
    setValues({ ...values, [name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({...values, buttonText: 'Submitting'})
    axios({
      method: 'Post',
      url: `${process.env.REACT_APP_API}/signup`,
      data: {name, email, password}
    })
    .then(response => {
      console.log('SIGNUP SUCCESS', response)
      setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'})
      toast.success(response.data.message)
    }).catch(error => {
      console.log('SIGNUP ERROR', error.response.data)
      setValues({ ...values, buttonText: 'Submit'})
      toast.error(error.response.data.error)
    })
  }

  const signupForm = () => (
    <DataForm >
      <DataField >
        <label >Name</label>
        <input  type="text" value={name} onChange={handleChange('name')}></input>
      </DataField>
      <DataField>
        <label >Email</label>
        <input  type="text" value={email} onChange={handleChange('email')}></input>
      </DataField>
      <DataField >
        <label>Password</label>
        <input type="text" value={password} onChange={handleChange('password')}></input>
      </DataField>
      <DataField>
        <Submit onClick={handleSubmit}>{buttonText}</Submit>
      </DataField>
      <br></br>
        <Link to='/auth/password/forgot'>Forgot Password</Link>
    </DataForm>
  )

  return (
  <Layout >
    <FormWrapper>
      <ToastContainer />
      {isAuth() ? <Redirect to='/' /> : null}
      {signupForm()}
      
    </FormWrapper>
  </Layout>
  )
}

export default Signup