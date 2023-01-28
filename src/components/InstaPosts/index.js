import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import UsersPostsCard from '../UserPostsCard'
import SomethingWentWrongCard from '../SomethingWentWrongCard'

import './index.css'

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class InstaPosts extends Component {
  state = {
    usersPosts: [],

    usersPostsApiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    this.setState({usersPostsApiStatus: constantApiStatus.inProgress})

    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
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

      this.setState({
        usersPostsApiStatus: constantApiStatus.success,
        usersPosts: data.posts,
      })
    } else {
      this.setState({usersPostsApiStatus: constantApiStatus.failure})
    }
  }

  renderSuccessViewOfUserPosts = () => {
    const {usersPosts} = this.state
    return (
      <ul className="posts-main-container">
        {usersPosts.map(eachItem => (
          <UsersPostsCard key={eachItem.post_id} usersPostsDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  retryFunction = () => {
    this.getUserPosts()
  }

  renderFailureViewOfUserPosts = () => (
    <SomethingWentWrongCard retryFunction={this.retryFunction} />
  )

  renderUserPosts = () => {
    const {usersPostsApiStatus} = this.state
    switch (usersPostsApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfUserPosts()
      case constantApiStatus.failure:
        return this.renderFailureViewOfUserPosts()
      default:
        return null
    }
  }

  render() {
    return <div className="main-container">{this.renderUserPosts()}</div>
  }
}
export default InstaPosts
