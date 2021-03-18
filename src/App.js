import React, {useEffect, useState} from 'react';
import Layout from './main/Layout'
import { WaveTopBottomLoading } from 'react-loadingg';
import styled from 'styled-components';
import Landing from './styledComponents/Landing'
import DataCard from './styledComponents/DataCard'
import Fade from "./Fade";
import './index.css'
const Container = () => <WaveTopBottomLoading />;


const LandingCard = styled(DataCard)`
  width: 65%;
  margin: 0 auto;
 
  img {
    max-height: 100%;
    max-width: 100%;
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
