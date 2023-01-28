import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

class SearchPostsCard extends Component {
  state = {isLiked: false, likeCount: 0, likedStatus: false}

  getLikeStatus = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {likedStatus} = this.state
    const {searchPostsDetails} = this.props
    const {postId} = searchPostsDetails.post_id
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: likedStatus}),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
    }
  }

  onClickLikeBtn = () => {
    this.setState({isLiked: true})
    this.setState(prevState => ({likeCount: prevState.likeCount + 1}))
    this.setState({likedStatus: true}, this.getLikeStatus)
  }

  onClickDisLikeBtn = () => {
    this.setState({isLiked: false})
    this.setState(prevState => ({likeCount: prevState.likeCount - 1}))
    this.setState({likedStatus: false}, this.getLikeStatus)
  }

  render() {
    const {searchPostsDetails} = this.props

    const {likeCount, isLiked} = this.state

    console.log(searchPostsDetails)
    return (
      <li
        className="userPostsCard-container"
        testid="postCard"
        key={searchPostsDetails.post_id}
      >
        <div className="UsersPostsCard-profile">
          <div className="img-container-profile-pic">
            <img
              src={searchPostsDetails.profile_pic}
              alt="post author profile"
              className="UsersPostsCard-profile-img"
            />
          </div>

          <Link
            to={`/users/${searchPostsDetails.user_id}`}
            className="nav-logo-link"
          >
            <h1 className="UsersPostsCard-name">
              {searchPostsDetails.user_name}
            </h1>
          </Link>
        </div>

        <img
          src={searchPostsDetails.post_details.image_url}
          alt="post"
          className="post-details-img"
        />

        <div className="below-container">
          <div className="like-comment-share-container">
            {isLiked ? (
              <button
                type="button"
                className="like-btn"
                onClick={this.onClickDisLikeBtn}
                testid="unLikeIcon"
              >
                <FcLike className="icon-btn-cls active-like" />
              </button>
            ) : (
              <button
                type="button"
                className="like-btn"
                onClick={this.onClickLikeBtn}
                testid="likeIcon"
              >
                <BsHeart className="icon-btn-cls" />
              </button>
            )}
            <FaRegComment className="icon-btn-cls" />
            <BiShareAlt className="icon-btn-cls" />
          </div>
          <p className="likes-count-cls">
            {searchPostsDetails.likes_count + likeCount} likes
          </p>
          <p className="post-details-caption">
            {searchPostsDetails.post_details.caption}
          </p>
          <ul className="comments-detail-container">
            {searchPostsDetails.comments.map(eachItem => (
              <li key={eachItem.user_id} className="comment-list-item">
                <p className="commented-text">
                  <span className="commented-user-name">
                    {eachItem.user_name}
                  </span>
                  {eachItem.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="created-at">{searchPostsDetails.created_at}</p>
        </div>
      </li>
    )
  }
}
export default SearchPostsCard
