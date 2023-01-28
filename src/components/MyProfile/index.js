import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'

import SomethingWentWrongCard from '../SomethingWentWrongCard'
import './index.css'

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    myProfileList: [],

    myProfileApiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({myProfileApiStatus: constantApiStatus.inProgress})

    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
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
      console.log(data.profile)
      this.setState({
        myProfileApiStatus: constantApiStatus.success,
        myProfileList: data.profile,
      })
    } else {
      this.setState({myProfileApiStatus: constantApiStatus.failure})
    }
  }

  renderSuccessViewOfMyProfile = () => {
    const {myProfileList} = this.state
    return (
      <div className="user-profile-main-con">
        <div className="mobile-view">
          <h1 className="username-mobile">{myProfileList.user_name}</h1>
          <div className="image-followers-following-posts-container">
            <img
              src={myProfileList.profile_pic}
              alt="my profile"
              className="profilePic"
            />
            <div className="desktop">
              <p className="username-desktop">{myProfileList.user_name}</p>
              <ul className="subCons-container">
                <li className="subCon">
                  <p className="count">{myProfileList.posts_count}</p>
                  <p className="count-heading">posts</p>
                </li>
                <li className="subCon">
                  <p className="count">{myProfileList.followers_count}</p>
                  <p className="count-heading">followers</p>
                </li>
                <li className="subCon">
                  <p className="count">{myProfileList.following_count}</p>
                  <p className="count-heading">following</p>
                </li>
              </ul>
              <p className="username-main-desktop">{myProfileList.user_id}</p>
              <p className="bio-desktop">{myProfileList.user_bio}</p>
            </div>
          </div>
          <p className="username-main-mobile">{myProfileList.user_id}</p>
          <p className="bio-mobile">{myProfileList.user_bio}</p>
        </div>

        <div className="desktop-view-styling">
          <ul className="story-container">
            {myProfileList.stories.map(eachItem => (
              <li key={eachItem.id}>
                <img
                  src={eachItem.image}
                  alt="my story"
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
          {myProfileList.posts.length > 0 ? (
            <div className="posts-container">
              <ul className="ul">
                {myProfileList.posts.map(eachItem => (
                  <li key={eachItem.id} className="list-item">
                    <img
                      src={eachItem.image}
                      alt="my post"
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
    this.getMyProfile()
  }

  renderFailureViewOfMyProfile = () => (
    <SomethingWentWrongCard retryFunction={this.retryFunction} />
  )

  renderMyProfileView = () => {
    const {myProfileApiStatus} = this.state
    switch (myProfileApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfMyProfile()
      case constantApiStatus.failure:
        return this.renderFailureViewOfMyProfile()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderMyProfileView()}
      </>
    )
  }
}
export default MyProfile
