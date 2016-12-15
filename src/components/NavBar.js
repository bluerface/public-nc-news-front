import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

const NavBar = React.createClass({
  componentWillMount: function () {
    this.props.fetchTopics();
  },
  render: function () {
    return (
      <nav className="nav">
        <Link to='/' className="nav-item">Home</Link>
        {
          this.props.topics && this.props.topics.map(function (topic, i) {
            return <Link to={`/${topic.slug}`} key={i} className='nav-item'>{topic.title}</Link>;
          })
        }
      </nav>
    );
  }
});

function mapStateToProps (state) {
  return {
    topics: state.main.topics
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTopics: function () {
      dispatch(actions.fetchTopics());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
