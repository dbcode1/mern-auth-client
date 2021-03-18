import styled from 'styled-components';

const DataCard = styled.div`
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin-bottom: 50px;
  border: 2px solid whitesmoke;
  border-radius: 6px;
  @media(max-width: 700px) {
    padding: 10px;
  }
  @media(min-width: 950px) {
    
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
    display: flex;
    max-width: 500px;
    justify-content: space-between;
  }
  p{ font-size: 0.75em;}
  h4 { padding-left: 15px;}
  h6 { font-weight: 400;}
`;

export default DataCard