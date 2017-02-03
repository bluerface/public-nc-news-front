import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

function requireAuth (Component) {
  class authComponent extends React.Component {
    render () {
      return <Component />;
    }
    componentWillMount () {
      if (!this.props.user) {
        browserHistory.push('/');
      }
    }
    componentWillUpdate (nextProps) {
      if (!nextProps.user) {
        browserHistory.push('/');
      }
    }
  }

  function mapStateToProps (state) {
    return {
      user: state.auth.currentUser
    };
  }

  return connect(mapStateToProps)(authComponent);
}

export default requireAuth;
