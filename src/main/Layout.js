import React, {Fragment} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import {isAuth, signout} from '../auth/helpers'
import styled from 'styled-components'
import Nav from './../styledComponents/Nav'

const NavButton = styled.li`
  margin-top: 0;
  list-style: none;
  width: 33%;
  transition: 0.5s;
  padding: 24px 0 0 0;
  transition-property: color, background-color;
  &:hover { background-color: gainsboro; color: blue }
  span {
    display: inline-block;
    font-size: 1.18em;
    padding-top: 2px;
  }
  a {
    transition: 0.5s;
    transition-property: color;
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
const isActive = path =>{
  if(match.path === path) {
    return { color: 'royalblue'};
  } 
}

  const nav = () => (
    <Nav >
     
      {!isAuth() && (
        <Fragment>
          <NavButton >
            <Link style={{ textDecoration: 'none' }} to="/"  style={isActive('/')}>
             Home</Link>
          </NavButton>
          <NavButton>
            <Link to="/signin"  style={isActive('/signin')}>Signin</Link>
          </NavButton>
          <NavButton>
            <Link to="/signup"  style={isActive('/signup')}>Signup</Link>
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
          <NavButton className="Layout-item">
            <span 
              onClick={() => signout(() => {
                history.push('/')
            })}>
              Signout
            </span>
          </NavButton>

      )}

    </Nav>
  )
  return (
    <Fragment>
      {nav()}
      <div >{children}</div>
    </Fragment>
  )
}

export default withRouter(Layout)