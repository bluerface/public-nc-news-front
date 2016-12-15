import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';
import CommentContainer from './CommentContainer';
import {Link} from 'react-router';

class ArticleFull extends React.Component {
  componentDidMount () {
    this.props.fetchArticle();
    this.props.fetchComments();
  }
  render () {
    const {article} = this.props;
    if (article) {
      return (
        <div className='box article'>
          <h3 className='title is-3 '>{article.title}</h3>
          <h4 className='subtitle is-6'>
            by <Link to={`/users/${article.created_by}`}>{article.created_by}</Link> in <Link to={`/${article.belongs_to}`}>{article.belongs_to}</Link>
          </h4>

          <p style={{marginBottom: '40px'}}>
            {article.body}
          </p>

          {this.props.comments &&
            <CommentContainer
              comments={this.props.comments}
              articleId={this.props.params.article_id}
              postCommentSuccess={this.props.postCommentSuccess}
              deleteCommentSuccess={this.props.deleteCommentSuccess}
            />
          }

        </div>
      );
    } else {
      return (
        <div className='box'>Loading...</div>
      );
    }
  }
}

function mapStateToProps (state) {
  return {
    article: state.main.currArticle,
    comments: state.main.currArticleComments
  };
}

function mapDispatchToProps (dispatch, currProps) {
  return {
    fetchArticle: function () {
      dispatch(actions.fetchArticle(currProps.params.article_id));
    },
    fetchComments: function () {
      dispatch(actions.fetchComments(currProps.params.article_id));
    },
    postCommentSuccess: function (comment) {
      dispatch(actions.postCommentSuccess(comment));
    },
    deleteCommentSuccess: function (commentId) {
      dispatch(actions.deleteCommentSuccess(commentId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleFull);
