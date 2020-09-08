import React, { Component } from "react"
import { Button, FormInput, FormTextarea, Row, Col } from "shards-react"

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      replyClicked: false,
      comment: "",
      name: "",
    }
  }

  replyToComment = () => {
    this.setState({ replyClicked: true })
  }

  typeComment = (e) => {
    const { value, name } = e.target
    this.setState({
      [name]: value,
    })
  }

  replyCancel = () => {
    this.setState({
      replyClicked: false,
      name: "",
      comment: "",
    })
  }

  replySumbit = (parentComment) => {
    this.props.addComment(
      null,
      true,
      parentComment,
      this.state.name,
      this.state.comment
    )
    this.setState({
      replyClicked: false,
      name: "",
      comment: "",
    })
  }

  render() {
    const comment = this.props.commentData
    const date = new Date(comment.createdAt).toDateString()
    const replyActionsStyle = {
      backgroundColor: "#2196f3",
      margin: "5px 0 0 5px",
      lineHeight: "1",
    }
    const marginleft = `${(comment.depth - 1) * 10}%`
    return (
      <div className="single-comment" style={{ marginLeft: marginleft }}>
        <div className="comment-title">
          <div className="comment-user">
            <img
              alt={`user-${comment.name}`}
              src={`https://api.adorable.io/avatars/20/${comment.name}@adorable.io.png`}
            />
            <div>{comment.name}</div>
          </div>
          <span className="comment-date">{date}</span>
        </div>
        <div className="comment-message px-1 py-1">
          <p>{comment.message}</p>
          {this.props.commentData.depth > 4 ? null : (
            <span
              role="button"
              tabIndex="0"
              onClick={this.replyToComment}
              onKeyDown={this.replyToComment}
            >
              Reply
            </span>
          )}
        </div>
        {this.state.replyClicked ? (
          <div className="reply-FormInput">
            <Row>
              <Col sm="6" md="6" lg="6">
                <label htmlFor="name">Name</label>
                <FormInput
                  value={this.state.name}
                  name="name"
                  type="text"
                  onChange={this.typeComment}
                />
              </Col>
              <Col sm="12" md="12" lg="12">
                <label htmlFor="comment">Comment</label>
                <FormTextarea
                  name="comment"
                  value={this.state.comment}
                  placeholder="Type your comment..."
                  style={{ width: "100%" }}
                  onChange={this.typeComment}
                />
              </Col>
            </Row>
            <div className="comment-action">
              <Button
                size="small"
                color="primary"
                variant="contained"
                style={replyActionsStyle}
                onClick={() => this.replySumbit(comment)}
              >
                Submit
              </Button>
              <Button
                size="small"
                color="primary"
                variant="contained"
                style={replyActionsStyle}
                onClick={this.replyCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    )
  }
}

export default Comment
