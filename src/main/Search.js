import React, {useEffect, useState, Fragment, useCallback} from 'react'
import Layout from '../main/Layout'
import axios from 'axios'
import { isAuth, getCookie, signout, removeCookie, removeLocalStorage} from '../auth/helpers'
import SearchBar from './SearchBar'
import ArtCards from './ArtCards'
import jwt from 'jsonwebtoken'
import { WaveTopBottomLoading } from 'react-loadingg'
import {ToastContainer, toast} from 'react-toastify'
import Fade from "../Fade";
const Container = () => <WaveTopBottomLoading color="#03cffc"/>;

const Search = ({history, match }) => {
  const [values, setValues] = useState({
    name: '',
    buttonText: 'Submit',
    token: '',
    artData: [],
    loading: true,
    searchTerm: ''
  })

  const [titles, setTitles] = useState('')
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setValues({...values, loading: false})
    }, 3000)
    setShow(show => !show)
    
  }, [])

  const token = getCookie('token')
  const {exp} = jwt.decode(token)
  const user = isAuth()

  const onChangeValue = (term) => {
    console.log('onchange')
		setValues({ ...values, searchTerm: term });
	};

  const onSubmitValue = async (e) => {
		e.preventDefault();
    console.log('onsubmit')
		getArt(values.searchTerm); 
    getCollectionTitles()
	};

  const getCollectionTitles = async () => {
    // get user id send with request
    const user = isAuth()._id
    await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/collections/titles`,
      params: {
        id: user
      }
    }).then(response => {
      setTitles({ titles: response.data})

    }).catch(error => {
      console.log('GET COLLECTION TITLES ERROR', error.message)
    })
  }

  const getArt = async (searchTerm) => {
    setValues({ ...values, loading: true });
   
    try {
    const callSearchArt = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/search`,
      params: { q: searchTerm},
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      console.log(callSearchArt.data)
      setValues({...values, artData: callSearchArt.data, loading: false})
    } catch(error) {
      console.log('GET ART ERROR', error)
      toast.error(error.message)
    }
  }

  if(Date.now() >= exp * 1000){
     removeCookie('token')
     removeLocalStorage(user)
    history.push('/')
  }

  return (
    <Layout>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        
      />
      <SearchBar 
        change={onChangeValue} 
        term={values.searchTerm} 
        submit={onSubmitValue}
        inputTitle="Enter artist fullname"
        button="Search"
      />
      {values.loading &&
        <Container key={Date.now()} width={500} height={500} color="#03cffc" />
      }
      <Fade show={show} className="card">
        <ArtCards data={values.artData} titles={titles} setValues={setValues} values={values}/>  
      </Fade>
    </Layout>
    
  )
}
export default Search