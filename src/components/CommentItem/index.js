import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, onClickDeleteComment, onClickLikeUpdate} = props
  const {id, userName, userComment, bgClass, like} = commentDetails
  const commentAddDate = formatDistanceToNow(new Date())
  const commentBgInitialLetter = userName.slice(0, 1)
  let likeClass
  let likeImageUrl
  if (like === false) {
    likeClass = 'empty-like'
    likeImageUrl =
      'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  } else {
    likeClass = 'like'
    likeImageUrl =
      'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
  }
  const onClickDeleteIcon = () => {
    onClickDeleteComment(id)
  }
  const onLikeComment = () => {
    onClickLikeUpdate(id)
  }
  return (
    <li className="comment-box">
      <div className="comment-container">
        <div className={`initial-style ${bgClass}`}>
          <p>{commentBgInitialLetter}</p>
        </div>
        <div className="comment-details-container">
          <p className="user-name">
            {userName}
            <span className="time-on-comment-add">{commentAddDate}</span>
          </p>
          <p className="user-comment">{userComment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-button-container">
          <img src={likeImageUrl} alt="like" className="like-image" />
          <button type="button" onClick={onLikeComment} className={likeClass}>
            Like
          </button>
        </div>
        <button
          type="button"
          onClick={onClickDeleteIcon}
          className="delete-button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
