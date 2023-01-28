import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {RiCloseCircleFill} from 'react-icons/ri'
import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

class Header extends Component {
  state = {isDisplayNavContainer: false, isDisplaySearchContainer: false}

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  onClickSearchIcon = () => {
    const {enterSearchInput} = this.props
    enterSearchInput()
  }

  onClickCloseButton = () => {
    this.setState({isDisplayNavContainer: false})
  }

  onClickOpenButton = () => {
    this.setState({isDisplayNavContainer: true})
  }

  onClickSearchTab = () => {
    this.setState({isDisplaySearchContainer: true})
  }

  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {searchInput, match} = this.props
    const {isDisplayNavContainer, isDisplaySearchContainer} = this.state
    const {path} = match
    const activeBtn = 'active-nav-name'
    return (
      <>
        <nav className="nav-container">
          <ul className="logo-container">
            <Link to="/" className="nav-logo-link">
              <li>
                <img
                  src="https://res.cloudinary.com/dpj2drryk/image/upload/v1651904777/Standard_Collection_8_lvuxdc.png"
                  className="nav-logo-desktop-img"
                  alt="website logo"
                />
              </li>
            </Link>
            <li>
              <h1 className="nav-title-head">Insta Share</h1>
            </li>
          </ul>

          <button
            type="button"
            className="hamburger-btn btn"
            onClick={this.onClickOpenButton}
            testid="hamburgerMenuIcon"
          >
            <GiHamburgerMenu className="ham-icon" />
          </button>
          <div className="menu-container">
            <div className="nav-input-container">
              <input
                type="search"
                value={searchInput}
                className="inputCls"
                onChange={this.onChangeSearchInput}
                placeholder="Search Caption"
              />
              <button
                type="button"
                className="search-icon-btn"
                testid="searchIcon"
                onClick={this.onClickSearchIcon}
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
            <ul className="nav-list">
              <Link to="/" className="nav-link">
                <li>
                  <p
                    className={`nav-name ${
                      path === '/' && isDisplaySearchContainer === false
                        ? activeBtn
                        : null
                    }`}
                  >
                    Home
                  </p>
                </li>
              </Link>

              <Link to="/my-profile" className="nav-link">
                <li>
                  <p
                    className={`nav-name ${
                      path === '/my-profile' &&
                      isDisplaySearchContainer === false
                        ? activeBtn
                        : null
                    }`}
                  >
                    Profile
                  </p>
                </li>
              </Link>

              <li>
                <button
                  type="button"
                  onClick={this.onClickLogout}
                  className="logoutBtn"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {isDisplayNavContainer && (
          <ul className="nav-list small-list2">
            <Link to="/" className="nav-link">
              <li>
                <p
                  className={`nav-name ${
                    path === '/' && isDisplaySearchContainer === false
                      ? activeBtn
                      : null
                  }`}
                >
                  Home
                </p>
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="search-tab-button btn"
                onClick={this.onClickSearchTab}
              >
                <p
                  className={`nav-name ${
                    isDisplaySearchContainer ? activeBtn : null
                  }`}
                >
                  Search
                </p>
              </button>
            </li>
            <Link to="/my-profile" className="nav-link">
              <li>
                <p
                  className={`nav-name ${
                    path === '/my-profile' && isDisplaySearchContainer === false
                      ? activeBtn
                      : null
                  }`}
                >
                  Profile
                </p>
              </li>
            </Link>
            <li>
              <button
                className="logoutBtn"
                type="button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
            <button
              className="hamburger-button btn"
              type="button"
              onClick={this.onClickCloseButton}
              testid="closeIcon"
            >
              <RiCloseCircleFill className="close-icon btn" />
            </button>
          </ul>
        )}
        {isDisplaySearchContainer && (
          <div className="nav-small">
            <div className="nav-small-input-container">
              <input
                type="search"
                value={searchInput}
                className="inputCls"
                onChange={this.onChangeSearchInput}
                placeholder="Search Caption"
              />
              <button
                type="button"
                className="search-icon-btn"
                testid="searchIcon"
                onClick={this.onClickSearchIcon}
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
          </div>
        )}
      </>
    )
  }
}
export default withRouter(Header)
