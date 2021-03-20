import styled from 'styled-components';

import { device} from '../styledComponents/responsive'

export default styled.div`
	border: none;
	color: black;
	letter-spacing: 0.7px;
	label {
		color: grey;
		display: block;
	}
	padding: 4px 0;
	
	text-align: center;
	input {
		text-align: center;
		height: 35px;
		width: 200px;
		border: none;
		border: 2px solid lightgrey;
		border-radius: 6px;
		padding: 10px;
		@media ${device.tablet}{
			width: 250px;
		}
	}
`;


  