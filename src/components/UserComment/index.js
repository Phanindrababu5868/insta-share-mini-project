import './index.css'

const CommentItem = props => {
  const {commentDetails, loginUserName, onDeleteComment} = props
  const {id, comment} = commentDetails

  const onDelete = () => {
    onDeleteComment(id)
  }
  return (
    <li className="comment-list-item">
      <p className="commented-user-name">{loginUserName}</p>
      <p className="commented-text">{comment}</p>
      <button type="button" className="delete-btn" onClick={onDelete}>
        delete
      </button>
    </li>
  )
}

export default CommentItem
