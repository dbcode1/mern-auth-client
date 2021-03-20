import styled from 'styled-components';
import { device} from '../styledComponents/responsive'

export default styled.div`

  display: flex;
  height: 100vh;
  flex-direction: column; 
  justify-content: center; 
  align-items: center;

  h1 {
    font-size: 2.5em;
    color: grey;
    margin-top: -50px;
    font-family: 'PT Sans', sans-serif;
    @media (min-width: 650px){
      font-size: 3.5em;
    }
    @media (min-width: 1000px){
      font-size: 5em;
    }
  }
  h3{
    font-size: 1em;
    font-family: 'PT Sans', sans-serif;
    margin-top: 1em;
    @media (min-width: 650px){
      font-size: 1.35em;
    }
    @media (min-width: 1000px){
      font-size: 1.75em;
    }
  }
 
`;
