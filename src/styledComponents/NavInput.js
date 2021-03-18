import styled from 'styled-components';

export default styled.div`
  border: 2px solid grey;
  width: 50vw;
  text-align: center;
  :focus {
    outline: none;
  }
  input {
    a { outline: none; }
    font-size: 100%;
    background-color: #fff;
    @media(min-width: 750px) {
      font-size: 1.25em;
    }
    
  }
`;