import React, {useState, Fragment} from 'react'
import styled from 'styled-components'
import Button from '../styledComponents/Button'
import { SelectArrows } from "@styled-icons/entypo/SelectArrows"

const OpenClose = styled.span`
  position: fixed;
  top: 98px;
  right: 8px;
  z-index: 2000;
  padding: 2px;
  border-radius: 150px;
  background-color: #ccf5ff;
`
const Arrows = styled(SelectArrows) `
  width: 30px;
  height: 30px;
  color: #b9b7b7;
  transition: .25s ease color;
  display: inline-block;
  padding: 0;
  transition: color ease 0.5s;
  &:hover { 
    color: blue;
  }
`

const SearchForm = styled.form`
text-align: center;
margin: 0 auto;
display: flex;
margin: 0;
padding: 0;
width: 100%;
height: 10vh;
position fixed;
top:0;
right: 0;
z-index: 100;
background-color: #fff;
box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
`

const SearchInput = styled.input`
border: none;
width: 50vw;
text-align: center;
:focus {
    outline: none;
}
`

const SearchBar = (props) => {
  const [showNav, setShowNav] = useState(true)

  const hideNav = () => {
    setShowNav(!showNav)
  }

  const onFieldChange = (e) => {
    const term = e.target.value;
    props.change(term)
  }
  return (
    <Fragment>
      <OpenClose onClick={hideNav}>
        <Arrows>
        </Arrows>
      </OpenClose>
      <SearchForm onSubmit={props.submit} className={showNav ? 'showNav' : 'hideNav'}>
        <SearchInput  type="text" placeholder={props.inputTitle} name="search"  onChange={onFieldChange}></SearchInput>
        <Button type="submit" value="Submit">{props.button}</Button>
      </SearchForm>
    </Fragment>
  )
}

export default SearchBar