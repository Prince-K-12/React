import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

Header.defaultProps = {
    title:'Prince'
}

export default Header;