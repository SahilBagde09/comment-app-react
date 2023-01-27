import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    userName: '',
    userComment: '',
    commentList: [],
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
    console.log(event.target.value)
  }

  onChangeUserComment = event => {
    this.setState({userComment: event.target.value})
    console.log(event.target.value)
  }

  onAddComment = event => {
    event.preventDefault()
    const {userName, userComment} = this.state
    console.log(userName)
    console.log(userComment)
    const randomBgClassForComment =
      initialContainerBackgroundClassNames[
        Math.ceil(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    const newCommentDetails = {
      id: uuidV4(),
      userName,
      userComment,
      bgClass: randomBgClassForComment,
      like: false,
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newCommentDetails],
      userName: '',
      userComment: '',
    }))
  }

  onClickDeleteComment = id => {
    const {commentList} = this.state
    const newFilteredList = commentList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentList: newFilteredList})
  }

  onClickLikeUpdate = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, like: !eachComment.like}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {commentList, userName, userComment} = this.state
    const commentNumber = commentList.length
    return (
      <div className="bg-container">
        <h1 className="main-heading">Comments</h1>
        <div className="form-image-container">
          <form className="comment-form" onSubmit={this.onAddComment}>
            <p className="form-text">Say something about 4.0 Technologies</p>
            <input
              type="text"
              className="text-input"
              placeholder="Your Name"
              onChange={this.onChangeUserName}
              value={userName}
            />
            <textarea
              className="comment-area"
              placeholder="Your Comment"
              onChange={this.onChangeUserComment}
              value={userComment}
            />
            <button className="submit-button" type="submit">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
            alt="comments"
            className="comment-image"
          />
        </div>
        <hr className="horizontal-divider" />
        <div className="count-text-container">
          <div className="comment-cont-style">{commentNumber}</div>
          <p className="comment-number">Comment</p>
        </div>
        <ul className="add-comment-container">
          {commentList.map(eachComment => (
            <CommentItem
              commentDetails={eachComment}
              key={eachComment.id}
              onClickDeleteComment={this.onClickDeleteComment}
              onClickLikeUpdate={this.onClickLikeUpdate}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
