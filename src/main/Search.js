import React, {useEffect, useState, useRef, Fragment, useCallback} from 'react'
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
    loading: false,
    searchTerm: '',
    expanded: false
  })

  const [titles, setTitles] = useState('')
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    setShow(show => !show)
    
  }, [])

  const token = getCookie('token')
  const {exp} = jwt.decode(token)
  const user = isAuth()

  const onChangeValue = (term) => {
    
		setValues({ ...values, searchTerm: term });
    console.log('onchange', values.searchTerm)
	};

  const onSubmitValue = async (e) => {
		e.preventDefault();
    console.log('onsubmit', values.searchTerm)
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
      setValues({...values, loading: false})
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
        autoClose={3000}
        delay={3000}
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
        inputTitle="Enter artist full name"
        button="Search"
      />
      {values.loading &&
        <Container key={Date.now()} width={500} height={500} color="#03cffc" />
      }
      <Fade show={show} className="card">
        <ArtCards 
          data={values.artData} 
          titles={titles} />  
      </Fade>
    </Layout>
    
  )
}
export default Search