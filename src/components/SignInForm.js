import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions/actions';

function validate (values) {
  let errors = {};
  if (!values.username) errors.username = 'Required';
  if (!values.password) errors.password = 'Required';
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className='form-item'>
    <label className='label'>{label}</label>
    <p className='control'>
      <input {...input} placeholder={label} type={type} className='input' />
      {touched && error && <span className='help is-danger'>{error}</span>}
    </p>
  </div>
);

class SignInForm extends React.Component {
  handleSubmit (e) {
    e.preventDefault();
    this.props.signIn(this.props.formData);
  }
  renderError () {
    let { error } = this.props;
    if (error) {
      let message;

      if (error.main.status === 401) {
        message = 'Invalid username or password';
      }
      if (error.main.status === 400) {
        message = 'Username and password are required';
      }

      return (
        <div className='notification is-warning'>
          {message}
        </div>
      );
    }
  }
  render () {
    const handleSubmit = this.handleSubmit.bind(this);
    return (
      <div className='box'>
        <form onSubmit={handleSubmit}>
          {this.renderError()}
          <div>
            <label htmlFor='username'>Username</label>
            <Field name='username' component={renderField} type='text' />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <Field name='password' component={renderField} type='password' />
          </div>
          <button type='submit' className={`button is-success ${this.props.isLoading ? 'is-loading disabled' : ''}`}>Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    formData: state.form.signIn.values,
    error: state.auth.signInError,
    isLoading: state.auth.isSigningIn
  };
}

function mapDispatchToProps (dispatch) {
  return {
    signIn: function (credentials) {
      dispatch(actions.signIn(credentials));
    }
  };
}

SignInForm = connect(mapStateToProps, mapDispatchToProps)(SignInForm);

SignInForm = reduxForm({
  form: 'signIn',
  validate
})(SignInForm);

module.exports = SignInForm;
