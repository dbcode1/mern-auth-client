import styled from 'styled-components';
import { device} from '../styledComponents/responsive'

const DataCard = styled.div`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin-bottom: 50px;
  border: 2px solid whitesmoke;
  border-radius: 6px;
  @media(min-width: 700px) {
    padding: 15px;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
      appearance: none;
    color: #505050;
    height: 28px;
    border: none;
    border: 2px solid gainsboro;
    border-radius: 4px;
    padding: 0 6px;
    font-size: 1em;
  }
  #inline-wrap  {
    padding-top: 4px;
    display: flex;
    max-width: 500px;
    justify-content: space-between;
    font-size: 14px;
    @media ${ device.tablet} {
      font-size: 16px;
    }
    @media ${ device.laptop} {
      font-size: 18px;
    }
  }
  p{ font-size: 12px;}
  h4 { padding-left: 15px;}
  h5 {
    font-weight: 400;
    font-size: 17px;
    @media ${ device.tablet} {
      font-size: 16px;
    }
  }
  h6{
    font-weight: 400;
    font-size: 15px;
  }
`;

export default DataCard