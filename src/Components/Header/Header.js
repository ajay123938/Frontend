import React from 'react'
import './Header.css'

export default function Header({logOut}) {
 
  return (
    <>
   <header>🎓 Student Portal</header>
   {logOut === true ? <button class="logout-btn" onclick="logout()">Logout</button> : null}
  
   </>

  )
}
