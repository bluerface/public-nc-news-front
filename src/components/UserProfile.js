import React from 'react';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';


class UserProfile extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render() {
    if(this.props.currUserProfile){
      return (
        <div className="box media">
          <img src={this.props.currUserProfile.avatar_url} className="media-left"/>
          <div className="media-content">
            <h3 className="title is-3">{this.props.currUserProfile.name}</h3>
            <p className="title is-5" >Username: {this.props.currUserProfile.username}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="box">Loading...</div>
      )
    }

  }
}

function mapStateToProps(state) {
  return {
    currUserProfile: state.main.currUserProfile
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchUser: function () {
      dispatch(actions.fetchUser(props.params.userName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
