// methods for saving and returning in cookie and local storage
import cookie from 'js-cookie'

// set in cookie
export const setCookie = (key, value) => {
  if(window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1
    })
  }
}

// remove from cookie

export const removeCookie = (key) => {
  if(window !== 'undefined') {
    cookie.remove(key, {
      expires: 1
    })
  }
}

// get from cookie such as stored token

export const getCookie = (key) => {
  if(window !== 'undefined') {
    return cookie.get(key)
  }
}
// set in localStorage

export const setLocalStorage = (key, value) => {
  if(window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// remove from localStorage
export const removeLocalStorage = (key, value) => {
  if(window !== 'undefined') {
    localStorage.removeItem(key, JSON.stringify(value))
  }
}
// authenticate user by passing data to cookie and localStorage during signin
export const authenticate = (response, next) => {
  setCookie('token', response.data.token)
  setLocalStorage('user', response.data.user)
  next();
}

export const signout = next => {
  removeCookie('token')
  removeLocalStorage('user')
  next()
}
export const clearData = () => {
  removeLocalStorage('token')
}

// access user info from localstorage
export const isAuth = () => {
  if (window !== 'undefined') {
      const cookieChecked = getCookie('token');
      
      if (cookieChecked) {
          if (localStorage.getItem('user')) {
              
              return JSON.parse(localStorage.getItem('user'));
          } else {
              return false;
          }
      }
  }
};

export const updateUser = (response, next) => {
  console.log('update user in local storage', response)
  if(typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'))
    auth = response.data
    localStorage.setItem('user', JSON.stringify(auth))
  }
  next()
}


