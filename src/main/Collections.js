import React, {useEffect, useState, Fragment} from 'react'
import Layout from '../main/Layout'
import axios from 'axios'
import SearchBar from './SearchBar'
import Card from './Card'
import { isAuth, getCookie} from '../auth/helpers'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import jwt from 'jsonwebtoken'
import Fade from "../Fade";
import styled from 'styled-components'
import DataCard from '../styledComponents/DataCard'
import {Delete} from '@styled-icons/material-outlined/Delete'
import {CloseCircle} from '@styled-icons/ionicons-outline/CloseCircle'
import ReactModal from 'react-modal'
import Masonry from 'react-masonry-css'
import { WaveTopBottomLoading } from 'react-loadingg'
const Container = () => <WaveTopBottomLoading color="#03cffc"/>;
const { inRange, _ } = require('lodash');

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  900: 2,
  675: 1
};

const Trash = styled(Delete)`
  color: black;
  width: 30px;
  height: auto;
  display: inline-block;
  padding: 0;
  transition: color ease 0.5s;
  &:hover { 
    color: cyan;
  }
`
const SelectedImage = styled.img`
  width: 100%;
  cursor: pointer;
`

const CollectionCard = styled(DataCard)`
  width: 90%;
  margin: 15px auto 15px auto;
  #inline-wrap {
   padding-bottom: 10px;
   max-width: 100%;
   width: 100%; //
  }
  button { 
    border: none;
    background: white;
    
  }
`

const CollectionWrapper = styled.div`
  margin-top: 125px;
`

const Collections = (props) => {
  const [values, setValues] = useState({
    name: '',
    collections: [],
    cards: [],
    buttonText: 'Submit',
    expanded: false,
    title: '',
    selectedImg: '',
    loading: false
})

  const token = getCookie('token')
  const user = isAuth()
  const [show, setShow] = useState(false);

  const onChangeValue = (e) => {
    setValues({ ...values, title: e });
  };

  const onSubmitValue = async (e) => {
  	e.preventDefault();
    addCollections()
  	//
  };  

  useEffect(() => {
    setValues({...values, loading: false});
    setShow(show => !show)
    getCollections(values, setValues, values.collections)
  }, [])

  const expandCard = (e) => {
    if(e.target){
    const img = e.target.src
    setValues({...values, expanded: !values.expanded, selectedImg: img})
    }
  }

  const collapse = (e) => {
    setValues({...values, expanded: !values.expanded})
  }

  const addCollections = (e) => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/collections`,
      params: { q: values.title},
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('ADD COLLECTIONS SUCCESS', response)
      setValues({ ...values, collections: response.data})
      getCollections()
    }).catch(error => {
      console.log('ADD COLLECTION ERROR', error.response)
    })
  }

  const getCollections = async (setter) => {
    // get user id send with request
    const user = isAuth()._id
    await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/collections`,
      params: {
        id: user
      }
    }).then(response => {
      setValues({ ...values, collections: response.data})
      
    }).catch(error => {
      console.log('GET COLLECTIONS ERROR', error.message)
    })
  }

  const deleteCollections = (e) => {
    e.preventDefault()
    if(window.confirm("Are you sure you want to permanently erase this collection?")){
      const title = e.target.parentNode.parentNode.childNodes[0].innerHTML
      console.log('title', title)
      axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_API}/collections/delete`,
        data: {
          title, 
          id: user._id
        },
          
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('DELETE COLLECTION', response)
        setValues({...values, collections: response.data})
        getCollections()
      }).catch(error => {
        console.log('DELETE COLLECTION ERROR', error.response.data.error)
      })
    } else {
      return
    }
  }

  return (
      <Layout>
        <SearchBar 
          inputTitle="Collection Name"
          button="Add"
          change={onChangeValue} 
          term={values.searchTerm} 
          submit={onSubmitValue}/>

        <Fade show={show}>
         <ToastContainer />
          <CollectionWrapper>
            { values.collections.map(collection => {
              return (
                <CollectionCard className="collection-card" >
                  <div id="inline-wrap">
                    <h4>{collection.title}</h4>
                    <button onClick={(e) => deleteCollections(e)}><Trash /></button>
                  </div>
                  {values.loading &&
                    <Container key={Date.now()} width={500} height={500} color="#03cffc" />
                  }
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {collection.cards.map((item, i) => {
                      return (
                        <Fragment>
                          <ReactModal 
                            isOpen={values.expanded}
                            className="Modal"
                            ariaHideApp={false}
                            overlayClassName="Overlay"
                          >
                            {/* <Collapse onClick={(e) => collapse(e)}/> */}
                            <SelectedImage id="selected-image" onClick={expandCard} src={values.selectedImg}/>
                          </ReactModal>
                          <Card key={i} values={values} item={item} expandCard={expandCard} >
                          </Card>
                        </Fragment>
                      )
                    })}
                  </Masonry>      
                </CollectionCard>
              )
            })}
          </CollectionWrapper>
        </Fade>
      </Layout>
    )
}
export default Collections