import React, {useState, Fragment, useEffect} from 'react'
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
height: 75px;
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

window.onload=function(){
  document.getElementById("input").click();
};

const SearchBar = ({change, submit, inputTitle, button}) => {
  const [showNav, setShowNav] = useState(true)

  const hideNav = () => {
    setShowNav(!showNav)
  }

  const onFieldChange = (e) => {
    const term = e.target.value;
    console.log('auto', e.target.value)
    change(term)
  }
  return (
    <Fragment>
      <OpenClose onClick={hideNav}>
        <Arrows>
        </Arrows>
      </OpenClose>
      <SearchForm autocomplete="off" onSubmit={submit} className={showNav ? 'showNav' : 'hideNav'}>
        <SearchInput id="input" type="text" placeholder={inputTitle} name="search"  onChange={onFieldChange}></SearchInput>
        <Button type="submit" value="Submit">{button}</Button>
      </SearchForm>
    </Fragment>
  )
}

export default SearchBar