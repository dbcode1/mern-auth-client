import React, {Fragment} from 'react'
import Card from './Card'
import { isAuth, getCookie } from '../auth/helpers'
import Masonry from 'react-masonry-css'
import styled from 'styled-components'
import { WaveTopBottomLoading } from 'react-loadingg'
import ReactModal from 'react-modal'
import {CloseCircle} from '@styled-icons/ionicons-outline/CloseCircle'
const Container = () => <WaveTopBottomLoading color="#03cffc"/>;
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  900: 2,
  600: 1
};

const SearchResults = styled.div`
  margin-top: 150px;
  `

const Collapse = styled(CloseCircle)`
  width: 30px;
`
const SelectedImage = styled.img`
  width: 100%;
  cursor: pointer;
`
const ArtCards = ({data, setValues, titles, values}) => {
  const user = isAuth()._id
  const token = getCookie('token')

  const collapse = (e) => {
    setValues({...values, expanded: !values.expanded})
  }

  const expandCard = (e) => {
    if(e.target){
    const img = e.target.src
    setValues({...values, expanded: !values.expanded, selectedImg: img})
    }
  }

  return (
    <Fragment>
      <SearchResults>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {data.map((item, i) => {
            if(item){
              return (
                <Fragment key={Math.random()}>
                  <ReactModal 
                    isOpen={values.expanded}
                    className="Modal"
                    overlayClassName="Overlay"
                  >
                    <SelectedImage id="selected-image" onClick={expandCard} src={values.selectedImg}/>
                  </ReactModal>
                  <Card key={i} values={values} titles={titles} item={item} setValues={setValues} expandCard={expandCard} >
                  </Card> 
                </Fragment>          
              )
            }
          })}
        </Masonry>
      </SearchResults>
    </Fragment>
  )
}

export default ArtCards