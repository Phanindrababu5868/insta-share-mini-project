import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../UserComment/index'
import './index.css'

class UsersPostsCard extends Component {
  state = {
    isLiked: false,
    likeCount: 0,
    likedStatus: false,
    userCommentsList: [],
    userComment: '',
    loginUserName: 'you',
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
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
      const userName = data.profile.user_name
      this.setState({loginUserName: userName})
    } else {
      this.setState({loginUserName: 'you'})
    }
  }

  onChangeCommentInput = event => {
    this.setState({userComment: event.target.value})
  }

  getLikeStatus = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {likedStatus} = this.state
    const {usersPostsDetails} = this.props
    const {postId} = usersPostsDetails.post_id
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: likedStatus}),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  showCommentInput = () => {
    this.setState(prevState => ({showInput: !prevState.showInput}))
  }

  onAddComment = () => {
    const {userComment} = this.state
    const newComment = {
      id: uuidv4(),
      comment: userComment,
    }
    this.setState(prevState => ({
      userCommentsList: [...prevState.userCommentsList, newComment],
      userComment: '',
    }))
    console.log(newComment)
  }

  onDeleteComment = id => {
    const {userCommentsList} = this.state
    const newList = userCommentsList.filter(each => each.id !== id)
    this.setState({userCommentsList: newList})
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
    const {usersPostsDetails} = this.props
    const {
      likeCount,
      isLiked,
      showInput,
      userCommentsList,
      userComment,
      loginUserName,
    } = this.state
    const isCommenting = showInput
      ? 'show-comment-input-to-user'
      : 'hide-comment-input'
    return (
      <li
        className="userPostsCard-container"
        testid="postCard"
        key={usersPostsDetails.post_id}
      >
        <div className="UsersPostsCard-profile">
          <div className="img-container-profile-pic">
            <img
              src={usersPostsDetails.profile_pic}
              alt="post author profile"
              className="UsersPostsCard-profile-img"
            />
          </div>

          <Link
            to={`/users/${usersPostsDetails.user_id}`}
            className="nav-logo-link"
          >
            <h1 className="UsersPostsCard-name">
              {usersPostsDetails.user_name}
            </h1>
          </Link>
        </div>

        <img
          src={usersPostsDetails.post_details.image_url}
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
                data-testid="unLikeIcon"
              >
                <FcLike className="icon-btn-cls active-like" />
              </button>
            ) : (
              <button
                type="button"
                className="like-btn"
                onClick={this.onClickLikeBtn}
                data-testid="likeIcon"
              >
                <BsHeart className="icon-btn-cls" />
              </button>
            )}
            <FaRegComment
              className="icon-btn-cls like-btn"
              onClick={this.showCommentInput}
            />
            <BiShareAlt className="icon-btn-cls" />
          </div>
          <p className="likes-count-cls">
            {usersPostsDetails.likes_count + likeCount} likes
          </p>
          <p className="post-details-caption">
            {usersPostsDetails.post_details.caption}
          </p>
          <div className={`comment-input-container ${isCommenting}`}>
            <textarea
              value={userComment}
              onChange={this.onChangeCommentInput}
              className="comment-input"
              placeholder="your comment"
              rows="1"
            />
            <button
              type="button"
              className="comment-btn"
              onClick={this.onAddComment}
            >
              comment
            </button>
          </div>
          <ul className="comments-detail-container">
            {userCommentsList.map(each => (
              <CommentItem
                key={each.id}
                onDeleteComment={this.onDeleteComment}
                commentDetails={each}
                loginUserName={loginUserName}
              />
            ))}
          </ul>
          <ul className="comments-detail-container">
            {usersPostsDetails.comments.map(eachItem => (
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
          <p className="created-at">{usersPostsDetails.created_at}</p>
        </div>
      </li>
    )
  }
}
export default UsersPostsCard
