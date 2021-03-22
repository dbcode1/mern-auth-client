import React, {Fragment} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import {getCookie, isAuth} from '../auth/helpers'
import Image from '../styledComponents/Image'
import { WaveTopBottomLoading } from 'react-loadingg'
import {ToastContainer, toast} from 'react-toastify'
import DataCard from './../styledComponents/DataCard';
const Container = () => <WaveTopBottomLoading color="#03cffc"/>;


const Card = ({titles, values, item, setValues, expandCard}) => {

    let location = useLocation()
    const user = isAuth()._id
    const token = getCookie('token')
   
    const addToCollection = async (e) => {
      e.preventDefault()
      // get selected card index
      const collections = document.getElementById(e.target.id)
      const selectedContainer = collections.options[collections.selectedIndex].text
      // get card data from dom
      const children = collections.parentElement.childNodes
      var imgFullURL = children[1].src;

      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/cards`,
        params: {
          title: children[0].innerHTML,
          img: imgFullURL,
          name: children[2].childNodes[0].innerHTML,
          date: children[2].children[1].innerHTML,
          containerTitle: selectedContainer,
          id : user
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        setValues({...values,  loading: false})
        toast.info(`Added to ${selectedContainer} Collection`)
      }).catch(error => {
        console.log('SAVE CARD ERROR', error)
      })
    }
    
  return (
    <Fragment>
      <DataCard key={Math.random()} >
         {/* {values.loading &&
          <Container width={500} height={500} key={Date.now()} color="#03cffc" />
        }  */}
        <h5>{item.title}</h5>
        <Image id="card-image" loading="lazy" src={item.img}  onClick={expandCard} className="item-img"/>
        <div id="inline-wrap">
          <h6>{item.name}</h6>
          <p>{item.date}</p>
        </div>
        {location.pathname === "/search" &&
        
          <select id={Math.random()} onChange={(e) => addToCollection(e)}>
          <option values=""  defaultValue key={Math.random()}>Add to  collection</ option>
            {titles.titles.map((item, index) => {
              return(
                <Fragment>
                <option value={item} key={index} id={index}>{item} </ option>
                </Fragment>
              )
             })} 
          </select>
        }
      </DataCard>
    </Fragment>     
  )
}

export default Card
