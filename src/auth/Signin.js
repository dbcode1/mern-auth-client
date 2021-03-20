import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../main/Layout'
import axios from 'axios'
import {authenticate} from './helpers'
import {isAuth} from './helpers'
import styled from 'styled-components'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import DataForm from './../styledComponents/DataForm';
import DataField from './../styledComponents/DataField'
import Button from './../styledComponents/Button'
import { device} from '../styledComponents/responsive'
import FormWrapper from '../styledComponents/FormWrapper'
import Submit from '../styledComponents/Submit'

const Signin = ({history}) => {
  const [values, setValues] = useState({
    email:'',
    password: '',
    buttonText: 'Submit'
  })

  const {email, password, buttonText} = values
  
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({...values, buttonText: 'Submitting'})

    console.log(`${process.env.REACT_APP_API}`)
    
    axios({
      method: 'Post', 
      url: `${process.env.REACT_APP_API}/signin`,
      data: {email, password}
    })
    .then(response => {
      console.log('SIGNIN SUCCESS', response)
      authenticate(response, () => {
        setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'})
        toast.success(`Hey,${response.data.user.name}, welcome back!`)
        isAuth() && isAuth().role === 'admin' ? history.push('./admin') : history.push('/search')
      })
      
    }).catch(error => {
      console.log('SIGNIN ERROR', error)
      toast.error('Wrong username or password')
      setValues({ ...values, buttonText: 'Submit'})
      toast.error(error)

    })
  }

  const signinForm = () => (
    <DataForm>
      <DataField>
        <label >Email</label>
        <input type="text" value={email} onChange={handleChange('email')}></input>
      </DataField>
      <DataField >
        <label>Password</label>
        <input type="text" value={password} onChange={handleChange('password')}></input>
      </DataField>
      <DataField>
        <Submit onClick={handleSubmit}>{buttonText}</Submit>
      </DataField>
      <br></br>
      <Link to='/auth/password/forgot' >Forgot Password</Link>
    </DataForm>
  )

  return (
  <Layout>
    <FormWrapper>
      <ToastContainer />
      {isAuth() ? <Redirect to='/' /> : null}
      {signinForm()}
    </FormWrapper>
  </Layout>
  )
}

export default Signin