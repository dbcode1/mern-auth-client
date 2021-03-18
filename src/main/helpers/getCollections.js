import { isAuth } from '../../auth/helpers'
import axios from 'axios'
export const getCollections = async () => {
  // get user id send with request
  const user = isAuth()._id
  
  await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API}/collections`,
    params: {
      id: user
    }
  }).then(response => {
    return response
  }).catch(error => {
    console.log('GET COLLECTIONS ERROR', error.message)
  })
}

export default getCollections