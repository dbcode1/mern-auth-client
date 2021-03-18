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


const SigninForm = styled(DataForm)`
  width: 100%;
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

const Signin = ({history}) => {
  const [values, setValues] = useState({
    email:'dmbrusky@gmail.com',
    password: '12345678',
    buttonText: 'Submit'
  })

  const {email, password, buttonText} = values
  
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({...values, buttonText: 'Submitting'})
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
    <SigninForm>
      <DataField>
        <label >Email</label>
        <input type="text" value={email} onChange={handleChange('email')}></input>
      </DataField>
      <DataField >
        <label>Password</label>
        <input type="text" value={password} onChange={handleChange('password')}></input>
      </DataField>
      <DataField>
        <SubmitButton onClick={handleSubmit}>{buttonText}</SubmitButton>
      </DataField>
      <br></br>
      <Link to='/auth/password/forgot' >Forgot Password</Link>
    </SigninForm>
  )

  return (
  <Layout>
    <div className="col-md-6 offset-md-3">
  
      <ToastContainer />
      
      {isAuth() ? <Redirect to='/' /> : null}
      <h1 className="p-5 text-center">Signin</h1>
      {signinForm()}
     

    </div>
  </Layout>
  )
}

export default Signin