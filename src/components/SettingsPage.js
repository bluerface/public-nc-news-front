import React from 'react';
import { connect } from 'react-redux';

class SettingsPage extends React.Component {
  render () {
    return (
      <div className='box'>
        This is a settings page for user
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.auth.currentUser
  };
}

module.exports = connect(mapStateToProps)(SettingsPage);
