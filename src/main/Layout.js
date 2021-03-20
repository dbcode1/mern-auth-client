import React, {Fragment, useState} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import {isAuth, signout} from '../auth/helpers'
import styled from 'styled-components'
import { SelectArrows } from "@styled-icons/entypo/SelectArrows"
import Nav from './../styledComponents/Nav'
import { device} from '../styledComponents/responsive'

const OpenClose = styled.span`
  position: fixed;
  bottom: 88px;
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
const NavButton = styled.li`
  margin-top: 0;
  list-style: none;
  transition: 0.5s;
  padding: 24px 0 0 0;
  width: 33.3%;
  transition-property: color, background-color;
  @media ${device.tablet} {
    width: 33.3%;
  }
  
  &:hover { background-color: gainsboro; color: blue }
  span {
    display: inline-block;
    font-size: 1.14em;
  
    
    @media ${device.laptop} {
      font-size: 1.3em;
      padding-top: 1px;
    }
    @media ${device.tablet} {
      font-size: 1.26em
    }
    @media ${device.tablet} {
      font-size: 1.26em
    }
 
  }
  a {
    transition: 0.5s;
    transition-property: color;
    font-size: 1.15em;
    @media ${device.tablet} {
      font-size: 1.35em;
    }
    &:hover {
      color: white;
    }
  }
  span {
    color: black;
    transition: 0.5s;
    transition-property: color;
    &:hover { 
      color: white;
    }
  }

`

const Layout = ({children, history, match}) => {

  const [showNav, setShowNav] = useState(true)
const isActive = path =>{
  if(match.path === path) {
    return { color: 'royalblue'};
  } 
}

  const hideNav = () => {
    setShowNav(!showNav)
  }

  const nav = () => (
  
    <Nav className={showNav ? 'showNav' : 'hideNav'}>
      {!isAuth() && (
        <Fragment>
          <NavButton>
            <Link style={{ textDecoration: 'none' }} to="/"  style={isActive('/')}>
             Home</Link>
          </NavButton>
          <NavButton>
            <Link to="/signin"  style={isActive('/signin')}>Log in</Link>
          </NavButton>
          <NavButton>
            <Link to="/signup"  style={isActive('/signup')}>Sign up</Link>
          </NavButton>
        </Fragment>
      )}
      {isAuth() && isAuth().role === 'admin' && (
          <NavButton>
            <Link 
               to="/admin" style={isActive('/private')}
              >
              {isAuth().name}
            </Link>
          </NavButton>
      )}
      
      {isAuth() && isAuth().role === 'subscriber' && (
        <Fragment>
          <NavButton>
            <Link 
               to="/private" style={isActive('/private')}
              >
              {isAuth().name}
            </Link>
          </NavButton>
          <NavButton>
            <Link to="/collections" style={isActive('/collections')}>
              Collections
            </Link>
          </NavButton>
          <NavButton>
            <Link to="/search" style={isActive('/search')}>
              Search
            </Link>
          </NavButton>
        </Fragment>
      )}
    
      {isAuth() && (
        <Fragment>
          <NavButton className="Layout-item">
            <span 
              onClick={() => signout(() => {
                history.push('/')
            })}>
              Signout
            </span>
          </NavButton>
         
         </Fragment>
      )}
    </Nav>
   
  )
  return (
    <Fragment>
      {nav()}
      <div >{children}</div>
      {isAuth() && (
        <OpenClose onClick={hideNav}>
          <Arrows>
          </Arrows>
        </OpenClose>
      )}
    </Fragment>
  )
}

export default withRouter(Layout)