import React, {useEffect, useState} from 'react';
import Layout from './main/Layout'
import { WaveTopBottomLoading } from 'react-loadingg';
import styled from 'styled-components';
import Landing from './styledComponents/Landing'
import DataCard from './styledComponents/DataCard'
import ReactModal from 'react-modal'
import Fade from "./Fade";
import './index.css'
const Container = () => <WaveTopBottomLoading />;


const LandingCard = styled.div`
  padding: 1em;
  background-color: white;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);  
  margin: 0.25em 0;
  border-radius: 6px;
  width: 80%;
  max-width: 800px;
  @media (min-width: 650px){
    padding: 1.75em;
  }
  @media (min-width: 1000px){
    padding: 2em;
  }
  img {
    width: 100%;
    height: auto;
  
  }
`

function App({match}) {
 
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(false)

  useEffect(() => {
    setValues({...values, loading: false});
    setShow(show => !show)
  }, [])
 
  return (
    <>
      <Fade show={show}>
      {show === true ? (
        <Layout>
          <Landing>
              <h1>The Collector</h1>
              <LandingCard>
                <img className="hero" src="https://openaccess-cdn.clevelandart.org/1960.81/1960.81_web.jpg" ></img>
              </LandingCard>
              <h3>Collect art from international museums.</h3>
          </Landing>
        </Layout>
      ) : (
        <Container />
      )}
      </Fade>

   </>
  )
}

export default App;
