import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import ArticleCard from './ArticleCard';

const ArticleList = React.createClass({
  componentDidMount () {
    this.props.fetchArticles();
  },
  render () {
    let articles;
    if (!this.props.params.topicName) {
      articles = this.props.articles
        .map(function (article, i) {
          return <ArticleCard article={article} key={i} />;
        });
    } else {
      articles = this.props.articles
        .filter((article) => {
          return article.belongs_to === this.props.params.topicName;
        })
        .map(function (article, i) {
          return <ArticleCard article={article} key={i} />;
        });
    }

    let title;
    if (!this.props.params.topicName) {
      title = 'Home';
    } else if (this.props.topics.length === 0) {
      title = '';
    } else {
      title = this.props.topics.find((e) => e.slug === this.props.params.topicName).title;
    }

    return (
      <div id='ArticleList' className='box'>
        <h3 className='title is-3'>
          {title}
        </h3>
        {articles}
      </div>
    );
  }
});

function mapStateToProps (state) {
  return {
    articles: state.main.articles,
    topics: state.main.topics
  };
}

function mapDispatchToProps (dispatch, props) {
  return {
    fetchArticles: () => {
      dispatch(actions.fetchArticles(props.params.topic));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
