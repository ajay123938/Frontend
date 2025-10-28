import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <><nav>
    <Link to="profile"><button>Profile view</button></Link>
    <Link to="Attendance"><button>Attendance</button></Link>
    <Link to="InternalResult"><button>Internal Results</button></Link>
    <Link to="Fee"><button>Fee Details</button></Link>
    <Link to="Notices"><button>Notices</button></Link>
    <Link to="HelpDesk"><button>Helpdesk</button></Link>
  </nav>
</>
  )
}
