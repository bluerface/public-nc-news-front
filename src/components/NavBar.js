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
      <nav className='nav'>
        <div className='nav-left'>
          <Link to='/' className='nav-item'>Home</Link>
          {
            this.props.topics && this.props.topics.map(function (topic, i) {
              return <Link to={`/${topic.slug}`} key={i} className='nav-item'>{topic.title}</Link>;
            })
          }
        </div>

        <div className='nav-right'>
          {this.getLoggedInHeader()}
        </div>
      </nav>
    );
  },
  getLoggedInHeader: function () {
    if (!this.props.user) {
      return (
        <span className='nav-item'>
          <Link to='/signup' className='button'>Sign Up</Link>
          <Link to='/signin' className='button'>Sign In</Link>
        </span>
      );
    } else {
      return (
        <span className='nav-item'>
          <Link to={`/users/${this.props.user.username}`} className='button is-medium'>
            <span className='icon'>
              <img src={this.props.user.avatar_url} height='20px' />
            </span>
            <span>{this.props.user.name}</span>
          </Link>
          <a href='#' className='button'>Log Out</a>
        </span>
      );
    }
  }
});

function mapStateToProps (state) {
  return {
    topics: state.main.topics,
    user: state.auth.currentUser
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
