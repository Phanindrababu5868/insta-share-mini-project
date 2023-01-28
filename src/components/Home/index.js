import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SearchPostsCard from '../SearchPostCard'
import Header from '../Header'
import SomethingWentWrongCard from '../SomethingWentWrongCard'

import './index.css'
import InstaStories from '../InstaStories'
import InstaPosts from '../InstaPosts'

const constantApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchPostsList: [],
    searchInput: '',
    searchPostsApiStatus: constantApiStatus.initial,
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    this.setState({searchPostsApiStatus: constantApiStatus.inProgress})
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
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
        searchPostsApiStatus: constantApiStatus.success,
        searchPostsList: data.posts,
      })
    } else {
      this.setState({searchPostsApiStatus: constantApiStatus.failure})
    }
  }

  renderSuccessViewOfSearchPosts = () => {
    const {searchPostsList} = this.state
    return (
      <>
        {searchPostsList.length === 0 ? (
          <div className="search-fail-con">
            <img
              src="https://res.cloudinary.com/dpj2drryk/image/upload/v1652192630/Group_1_dwo6su.png"
              alt="search not found"
              className="search-fail-image"
            />
            <h1 className="search-fail-heading">Search Not Found</h1>
            <p className="search-fail-description">
              Try different keyword or search again
            </p>
          </div>
        ) : (
          <div className="user-posts-detailed-view">
            <h1 className="search-heading">Search Results</h1>
            <ul className="search-post-list">
              {searchPostsList.map(eachItem1 => (
                <SearchPostsCard
                  key={eachItem1.post_id}
                  searchPostsDetails={eachItem1}
                />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  retryFunction = () => {
    this.getSearchResults()
  }

  renderFailureViewOfSearchPosts = () => (
    <SomethingWentWrongCard retryFunction={this.retryFunction} />
  )

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSearchResultsPosts = () => {
    const {searchPostsApiStatus} = this.state
    switch (searchPostsApiStatus) {
      case constantApiStatus.inProgress:
        return this.renderLoaderView()
      case constantApiStatus.success:
        return this.renderSuccessViewOfSearchPosts()
      case constantApiStatus.failure:
        return this.renderFailureViewOfSearchPosts()
      default:
        return null
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  enterSearchInput = () => {
    this.getSearchResults()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          searchInput={searchInput}
        />
        {searchInput !== '' ? (
          <>{this.renderSearchResultsPosts()}</>
        ) : (
          <div className="home-container">
            <InstaStories />

            <InstaPosts />
          </div>
        )}
      </>
    )
  }
}
export default Home
