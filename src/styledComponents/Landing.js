import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  ::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  h1 {
    font-size: 5em;
    color: grey;
    text-align: center;
    padding: 0.75em 0 10px 0;
    font-family: 'PT Sans', sans-serif;
  }
  h3{
    font-size: 1.25em;
    padding: 3em;
    text-align: center;
    font-family: 'PT Sans', sans-serif;
  }
 
`;
