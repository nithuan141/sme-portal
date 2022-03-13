import React, { useState, useContext } from "react";
import { CommentsContext } from "../../contexts/Comments.Context";
import { UsersContext } from "../../contexts/User.Context";
import { getLoggedInUser } from "../../services/user.service";

// Parse ISO string to Date
function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

// Format to Date Month Year
function isoFormatDMY(d) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }
  return (
    pad(d.getUTCDate()) +
    " " +
    month[d.getUTCMonth()].slice(0, 3) +
    " " +
    d.getUTCFullYear()
  );
}

// Recursive Function to place each Comment in correct position of the Comment's Tree Structure
function createCommentTree(comment, commentsTree) {
  let parentIndex;
  // initial condition for first insertion
  if (commentsTree.length == 0) {
    commentsTree.push(comment)
    return true
  }
  parentIndex = commentsTree.findIndex(treeComment => treeComment.id == comment.parentId)
  // when parentid is found add the comment as child
  if (parentIndex != -1) {
    commentsTree[parentIndex].children.push(comment)
    return true
  }
  // recursively search for parent in the branches
  for (const treeComment of commentsTree) {
    if (treeComment.children.length != 0) {
      let inserted = createCommentTree(comment, treeComment.children)
      // if found return true, Arrays use reference and has been updated at branch in the Tree
      if (inserted) {
        return inserted
      }
    }
  };
  return false
}

export const Comments = () => {
  // contexts
  const {
    courseId,
    comments,
    selectedComment,
    setSelectedComment,
    submitComment,
  } = useContext(CommentsContext);
  const { users } = useContext(UsersContext);

  // states
  const [description, setDescription] = useState("");

  // constants
  const currentUser = getLoggedInUser();
  const currentUserIcon = currentUser.name
    .split(" ")
    .map((name) => name.split("")[0])
    .join("");

  // Comment Tree to organise the comments.
  let commentsTree = []

  // Populate CommentTree if comments are available
  if (comments) {
    comments.forEach(comment => {
      const commentItem = comment
      commentItem.children = []
      const inserted = createCommentTree(commentItem, commentsTree)
      if (!inserted) {
        commentsTree.push(comment)
      }
    });
  }

  // common function to save a comment. 
  // input : description, parentId
  const handleSaveComment = (description, parentId) => {
    const currentDate = new Date();
    const comment = {
      courseId: courseId,
      userId: currentUser.id,
      description: description,
      parentId: parentId,
      createdDate: currentDate.toISOString(),
      createdBy: currentUser.id,
    };
    submitComment(comment);
  };

  // Component for Add new Comment Box
  const addNewComment = () => {
    const handleAddComment = (description) => {
      const parentId = 0;
      handleSaveComment(description, parentId);
    };

    return (
      <>
        <div className="comments-box d-flex ">
          <div className="comments__user comments__user-big">
            {currentUserIcon}
          </div>
          <textarea
            className="comments__comment-text"
            name="comment-text"
            id="comment-text"
            cols="30"
            rows="10"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            placeholder="Add Comment"
          />
        </div>
        <button
          className="sr-btn d-btn-add"
          onClick={() => handleAddComment(description)}
        >
          Add
        </button>
      </>
    );
  };

  // Component to show comments (Used Recursively for replies)
  const ShowComment = (props) => {
    // States for Show Comments
    const [showAddComment, toggleShowAddcomment] = useState(false);
    const [reply, setReply] = useState("");

    // Constants
    const comment = props.comment;
    const commentChildren = comment.children
    const commnentedByUser = users && users.find((user) => user.id == comment.userId);
    const commentedByUserName = commnentedByUser && commnentedByUser.name;
    const commentedOn = isoFormatDMY(parseISOString(comment.createdDate));
    const userIcon = commentedByUserName?.split(" ")
      .map((name) => name.split("")[0])
      .join("");
    const isSelected = selectedComment && comment.id == selectedComment.id;

    // Function to handle click on a Comment (selects the comment)
    const handleCommentclick = () => {
      setSelectedComment(comment);
    };

    // Function to handle click on the Reply button ( toggles the Add comment area visibility)
    const handleReplyButtonClick = () => {
      toggleShowAddcomment(!showAddComment);
    };

    // Handles the add button click inside the Reply. Invokes the Save comment with comment Id as parent Id
    const handleReplyAddButtonClick = (reply) => {
      if (showAddComment) {
        handleSaveComment(reply, comment.id);
      }
    };

    return (
      <div className="comments__message-box mt-3">
        <div className="comments__inner" onClick={() => handleCommentclick()}>
          <div className="comments__user comments__user-small">
            {userIcon}
          </div>
          <div className="comments__message">
            <p className="comments__head">
              <span>{commentedByUserName}</span>
              {commentedOn}
            </p>
            <p>{comment.description}</p>
            {isSelected && (
              <button
                className="comments__reply"
                onClick={() => handleReplyButtonClick()}
              >
                Reply
                </button>
            )}
            {showAddComment && (
              <div className="comments__reply-box mt-2">
                <input type="text"
                  className="comments__reply-input"
                  name="reply-input"
                  id="reply-input"
                  cols="30"
                  rows="10"
                  value={reply}
                  onChange={(event) => {
                    setReply(event.target.value);
                  }}
                  placeholder="Add Reply"
                />
                <button
                  className="sr-btn d-btn-add ms-0 mt-sm-0 mt-2"
                  onClick={() => handleReplyAddButtonClick(reply)}
                >
                  Add
                  </button>
              </div>
            )}
          </div>
        </div>
        {commentChildren.length != 0 &&
          commentChildren.map((childComment) => (
            <ShowComment comment={childComment} key={comment.id}/>
          ))}
      </div>
    );
  };
  return (
    <div className="comments mt-5">
      {/* add new comment area */}
      {addNewComment()}
      {/* list of comments */}
      {commentsTree &&
        commentsTree.map((comment) => (
          <div className="comments__messages" key={comment.id}>
            <ShowComment comment={comment } />
          </div>
        ))}
    </div>
  );
};
