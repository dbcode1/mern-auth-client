import React from 'react'
import styled from 'styled-components'
import Button from '../styledComponents/Button'

const SearchForm = styled.form`
text-align: center;
margin: 0 auto;
display: flex;
margin: 0;
padding: 0;
width: 100%;
height: 12vh;
position: fixed;
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
  const onFieldChange = (e) => {
    const term = e.target.value;
    props.change(term)
  }
  return (
    <SearchForm onSubmit={props.submit}>
      <SearchInput type="text" placeholder={props.inputTitle} name="search"  onChange={onFieldChange}></SearchInput>
      <Button type="submit" value="Submit">{props.button}</Button>
    </SearchForm>
  )
}

export default SearchBar