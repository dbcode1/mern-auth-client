import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
	display: block;
	padding: 8px;
	text-align: center;
	font-size: 1em;
	text-decoration: none;
	font-size: em;
	letter-spacing: 1.5px;
	transition-property: background-color, color, border;
	transition: 0.5s;
	border: none ;
	color: black;
	background-color: white;
	flex-grow: 1;
	min-width: 0;
	a {
		text-decoration: none;
	}
	&:hover {
		color: royalblue;
		a { font-weight: bold; }
		background-color: gainsboro;
		border-color: cyan;
	}
	:focus {
		outline: none;
	}
`;
export default Button;
