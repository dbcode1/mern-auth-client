import styled from 'styled-components';


const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
	margin: 9vh 0 0 0;
	@media(min-width: 740px){
		margin 11vh 0 0 0;
	}
	padding: 0;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
	button{
		font-size: 1.25em;
	}
`
export default Wrapper