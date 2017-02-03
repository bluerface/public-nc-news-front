import React from 'react';
import { connect } from 'react-redux';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

function CommentContainer (props) {
  return (
    <div>
      <h3 className='title is-3'>Comments</h3>
      {props.user && <CommentForm articleId={props.articleId} postCommentSuccess={props.postCommentSuccess} />}
      {
        props.comments
          .sort(function (a, b) {
            return b.created_at - a.created_at;
          })
          .map((comment, i) => {
            return <CommentCard key={i} comment={comment} deleteCommentSuccess={props.deleteCommentSuccess} />;
          })
      }
    </div>
  );
}

function mapStateToProps (state) {
  return {
    user: state.auth.currentUser
  };
}

export default connect(mapStateToProps)(CommentContainer);
