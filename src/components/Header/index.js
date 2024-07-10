import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  // console.log(props)
  const {history} = props

  const onClickLogout = () => {
    // console.log("Logout Button Clicked")
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <nav className="nav-header">
        <div className="nav-content">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <div className="navbar-menu-container">
            <ul className="navbar-menu-mobile-icons">
              <li>
                <Link to="/">
                  <AiFillHome className="nav-menu-item" />
                </Link>
              </li>
              <li>
                <Link to="/jobs">
                  <BsFillBriefcaseFill className="nav-menu-item" />
                </Link>
              </li>
            </ul>
            <ul className="navber-menu-desktop-icons">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-button-container">
            <button
              label="text"
              type="button"
              className="logout-mobile-btn"
              onClick={onClickLogout}
            >
              <FiLogOut />
            </button>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Header)
