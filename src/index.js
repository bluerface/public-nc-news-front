import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import App from './components/App';
import ArticleList from './components/ArticleList';
import ArticleFull from './components/ArticleFull';
import UserProfile from './components/UserProfile';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

import main from './reducer/reducer';
import auth from './reducer/authReducer';
import * as actions from './actions/actions';

let reducers = combineReducers({
  form: formReducer,
  main,
  auth
});

const store = createStore(reducers, applyMiddleware(thunk, createLogger()));

let user = localStorage.getItem('user');
if (user) {
  store.dispatch(actions.authUser(JSON.parse(user)));
}

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={ArticleList} />
        <Route path='/article/:article_id' component={ArticleFull} />
        <Route path='/users/:userName' component={UserProfile} />
        <Route path='/signin' component={SignInForm} />
        <Route path='/signup' component={SignUpForm} />
        <Route path='/:topicName' component={ArticleList} />
      </Route>
    </Router>
  </Provider>, document.getElementById('app')
);
