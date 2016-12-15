import * as types from './types';
import request from 'superagent';

import { ROOT } from '../../config';

export function fetchArticles () {
  return (dispatch) => {
    dispatch({ type: types.FETCH_ARTICLES_REQUEST });
    request
      .get(`${ROOT}/articles`)
      .end((err, res) => {
        if (err) dispatch({ type: types.FETCH_ARTICLES_ERROR, err });
        else dispatch({ type: types.FETCH_ARTICLES_SUCCESS, data: res.body });
      });
  };
}

export function fetchTopics () {
  return (dispatch) => {
    dispatch({ type: types.FETCH_TOPICS_REQUEST });
    request
      .get(`${ROOT}/topics`)
      .end((err, res) => {
        if (err) dispatch({ type: types.FETCH_TOPICS_ERROR, err });
        else dispatch({ type: types.FETCH_TOPICS_SUCCESS, data: res.body });
      });
  };
}

export function fetchArticle (id) {
  return (dispatch) => {
    dispatch({ type: types.FETCH_ARTICLE_REQUEST });
    request
      .get(`${ROOT}/articles/${id}`)
      .end((err, res) => {
        if (err) dispatch({ type: types.FETCH_ARTICLE_ERROR, err });
        else dispatch({ type: types.FETCH_ARTICLE_SUCCESS, data: res.body });
      });
  };
}

export function fetchComments (id) {
  return (dispatch) => {
    dispatch({ type: types.FETCH_COMMENTS_REQUEST });
    request
      .get(`${ROOT}/articles/${id}/comments`)
      .end((err, res) => {
        if (err) dispatch({ type: types.FETCH_COMMENTS_ERROR, err });
        else dispatch({ type: types.FETCH_COMMENTS_SUCCESS, data: res.body });
      });
  };
}

export function postCommentSuccess (comment) {
  return {
    type: types.POST_COMMENT_SUCCESS,
    comment
  };
}

export function deleteCommentSuccess (commentId) {
  return {
    type: types.DELETE_COMMENT_SUCCESS,
    commentId
  };
}

export function fetchUser (username) {
  return (dispatch) => {
    dispatch({ type: types.FETCH_USER_REQUEST});
    request
      .get(`${ROOT}/users/${username}`)
      .end((err, res) => {
        if (err) dispatch({ type: types.FETCH_USER_ERROR, err });
        else dispatch({ type: types.FETCH_USER_SUCCESS, data: res.body });
      });
  };
}

export function signUp (credentials) {
  return (dispatch) => {
    console.log(credentials);
    dispatch({type: types.SIGNUP_REQUEST});
    request
      .post(`${ROOT.slice(0, -4)}/signup`)
      .send(credentials)
      .end((err, res) => {
        if (err) {
          dispatch({ type: types.SIGNUP_ERROR, err: {err, reason: res.body.reason} });
        } else {
          localStorage.setItem('token', res.body.token);
          localStorage.setItem('user', res.body.user);

          dispatch({ type: types.SIGNUP_SUCCESS, user: res.body.user });
        }
      });
  };
}
