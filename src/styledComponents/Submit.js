import styled from 'styled-components'
import Button from './Button'
import { device} from '../styledComponents/responsive'


export default styled(Button)`
  border: 2px solid royalblue;
  border-radius: 6px;
  color: royalblue;
  margin: 20px auto 0 auto;
  width: 200px;
  @media ${device.tablet}{
    width: 250px;
  }
  &:hover {
    background-color: white;
    color: cyan;
  }
`