import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import main from './reducer/reducer';
import App from './components/App';
import ArticleList from './components/ArticleList';
import ArticleFull from './components/ArticleFull';
import UserProfile from './components/UserProfile';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

let reducers = combineReducers({
  main
});

const store = createStore(reducers, applyMiddleware(thunk, createLogger()));

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
