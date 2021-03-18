import styled from 'styled-components';

export default styled.ul`
	text-align: center;
	display: flex;
	margin: 0;
	padding: 0;
	flex-grow: 0;
	min-height: 5rem;
	width: 100%;
	position: fixed;
	z-index: 1000;
	bottom: 0;
	left: 0;
	background-color: white;
	box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
	list-style: none;
	a { 
		color: black; 
		font-size: 1.25em;
		padding 0.5em 0 0 0;
		text-decoration: none!important;
		}
	

	li.form-button {
		background-color: white;
		width: 100%;
		margin-top: 0px;
		line-height: 5rem;
		height: 5rem;
		button {
			border: none;
			background-color: white;
		
		}
		
	}
`;