import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Slider from 'react-slick'
import SomethingWentWrongCard from '../SomethingWentWrongCard'
import './index.css'

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class InstaStories extends Component {
  state = {
    userStories: [],

    usersStoriesApiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.getUserStories()
  }

  getUserStoriesFormattedData = eachItem => ({
    userId: eachItem.user_id,
    storyUrl: eachItem.story_url,
    userName: eachItem.user_name,
  })

  getUserStories = async () => {
    this.setState({usersStoriesApiStatus: constantApiStatus.inProgress})

    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachItem =>
        this.getUserStoriesFormattedData(eachItem),
      )
      this.setState({
        usersStoriesApiStatus: constantApiStatus.success,
        userStories: updatedData,
      })
    } else {
      this.setState({usersStoriesApiStatus: constantApiStatus.failure})
    }
  }

  renderSuccessViewOfUserStories = () => {
    const {userStories} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 100,
      slidesToScroll: 1,
    }

    return (
      <>
        <Slider
          {...settings}
          slidesToShow={4}
          className="user-stories-mobile-view"
        >
          {userStories.map(eachItem => (
            <ul key={eachItem.userId} className="slick-item">
              <li className="slick-story-items">
                <div className="story-ring">
                  <img
                    src={eachItem.storyUrl}
                    alt="user story"
                    className="logo-image"
                  />
                </div>

                <h1 className="story-user-name">{eachItem.userName}</h1>
              </li>
            </ul>
          ))}
        </Slider>

        <Slider
          {...settings}
          slidesToShow={7}
          className="user-stories-desktop-view"
        >
          {userStories.map(eachItem => (
            <ul key={eachItem.userId} className="slick-item">
              <li className="slick-story-items">
                <div className="story-ring">
                  <img
                    src={eachItem.storyUrl}
                    alt="user story"
                    className="logo-image"
                  />
                </div>

                <h1 className="story-user-name">{eachItem.userName}</h1>
              </li>
            </ul>
          ))}
        </Slider>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderUserStories = () => {
    const {usersStoriesApiStatus} = this.state
    switch (usersStoriesApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfUserStories()
      case constantApiStatus.failure:
        return this.renderFailureViewOfUserStories()
      default:
        return null
    }
  }

  retryFunction = () => {
    this.getUserStories()
  }

  renderFailureViewOfUserStories = () => (
    <SomethingWentWrongCard retryFunction={this.retryFunction} />
  )

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderUserStories()}</div>
      </div>
    )
  }
}
export default InstaStories
