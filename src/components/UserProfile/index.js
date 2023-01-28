import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import SomethingWentWrongCard from '../SomethingWentWrongCard'
import Header from '../Header'

import './index.css'

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    userProfileList: [],

    userProfileApiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({userProfileApiStatus: constantApiStatus.inProgress})
    console.log(this.props)
    const {match} = this.props
    const {userId} = match.params
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.user_details)
      this.setState({
        userProfileApiStatus: constantApiStatus.success,
        userProfileList: data.user_details,
      })
    } else {
      this.setState({userProfileApiStatus: constantApiStatus.failure})
    }
  }

  renderSuccessViewOfUserProfile = () => {
    const {userProfileList} = this.state

    return (
      <div className="user-profile-main-con">
        <div className="mobile-view">
          <h1 className="username-mobile">{userProfileList.user_name}</h1>
          <div className="image-followers-following-posts-container">
            <img
              src={userProfileList.profile_pic}
              alt="user profile"
              className="profilePic"
            />
            <div className="desktop">
              <p className="username-desktop">{userProfileList.user_name}</p>
              <ul className="subCons-container">
                <li className="subCon">
                  <p className="count">{userProfileList.posts_count}</p>
                  <p className="count-heading">posts</p>
                </li>
                <li className="subCon">
                  <p className="count">{userProfileList.followers_count}</p>
                  <p className="count-heading">followers</p>
                </li>
                <li className="subCon">
                  <p className="count">{userProfileList.following_count}</p>
                  <p className="count-heading">following</p>
                </li>
              </ul>
              <p className="username-main-desktop">{userProfileList.user_id}</p>
              <p className="bio-desktop">{userProfileList.user_bio}</p>
            </div>
          </div>
          <p className="username-main-mobile">{userProfileList.user_id}</p>
          <p className="bio-mobile">{userProfileList.user_bio}</p>
        </div>

        <div className="desktop-view-styling">
          <ul className="story-container">
            {userProfileList.stories.map(eachItem => (
              <li key={eachItem.id}>
                <img
                  src={eachItem.image}
                  alt="user story"
                  className="storyImage"
                />
              </li>
            ))}
          </ul>
          <hr className="line" />
          <div className="icon-heading-con">
            <BsGrid3X3 className="posts-icon" />
            <h1 className="posts-heading">Posts</h1>
          </div>
          {userProfileList.posts.length > 0 ? (
            <div className="posts-container">
              <ul className="ul">
                {userProfileList.posts.map(eachItem => (
                  <li key={eachItem.id} className="list-item">
                    <img
                      src={eachItem.image}
                      alt="user post"
                      className="post-image"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="no-posts-display">
              <div className="icon-con">
                <BiCamera className="no-posts-icon" />
              </div>
              <h1 className="no-posts-para">No Posts</h1>
            </div>
          )}
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  retryFunction = () => {
    this.getUserProfile()
  }

  renderFailureViewOfUserProfile = () => (
    <SomethingWentWrongCard retryFunction={this.retryFunction} />
  )

  renderUserProfileView = () => {
    const {userProfileApiStatus} = this.state
    switch (userProfileApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfUserProfile()
      case constantApiStatus.failure:
        return this.renderFailureViewOfUserProfile()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderUserProfileView()}
      </>
    )
  }
}
export default UserProfile
