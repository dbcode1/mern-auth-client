import React, {Fragment} from 'react'
import Card from './Card'
import { isAuth, getCookie } from '../auth/helpers'
import Masonry from 'react-masonry-css'
import { WaveTopBottomLoading } from 'react-loadingg'
const Container = () => <WaveTopBottomLoading color="#03cffc"/>;

const ArtCards = ({data, setValues, titles, values}) => {
  const user = isAuth()._id
  const token = getCookie('token')
  return (
    <Fragment>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
      {data.map((item, i) => {
        if(item){
          return (
            <Card item={item} titles={titles} values={values} setValues={setValues} />
          )
        }
      })
    }
      </Masonry>
    </Fragment>
  )
}

export default ArtCards