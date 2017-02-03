import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

function validate (values) {
  let errors = {};

  if (!values.name) errors.name = 'Required';
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

class SignUpForm extends React.Component {
  render () {
    const handleSubmit = this.handleSubmit.bind(this);
    return (
      <div className='box'>
        <form onSubmit={handleSubmit}>
          {this.renderError()}
          <div>
            <label htmlFor='name'>Name *</label>
            <Field name='name' component={renderField} type='text' />
          </div>
          <div>
            <label htmlFor='username'>Username *</label>
            <Field name='username' component={renderField} type='text' />
          </div>
          <div>
            <label htmlFor='password'>Password *</label>
            <Field name='password' component={renderField} type='password' />
          </div>
          <button type='submit' className={`button is-success ${this.props.isLoading ? 'is-loading disabled' : ''}`}>Submit</button>
        </form>
      </div>
    );
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.signUp(this.props.formData);
  }

  renderError () {
    let { error } = this.props;
    if (error) {
      let message;
      if (error.main.status === 422 && error.body.reason === 'body must include password, username and name properties') {
        message = 'Please fill in all required fields';
      }
      if (error.main.status === 422 && error.body.reason === 'Username is in use') {
        message = 'Username is not available';
      }

      return (
        <div className='notification is-warning'>
          {message}
        </div>
      );
    }
  }

}

function mapStateToProps (state) {
  return {
    formData: state.form.signUp.values,
    error: state.auth.signUpError,
    isLoading: state.auth.isSigningUp
  };
}

function mapDispatchToProps (dispatch) {
  return {
    signUp: function (credentials) {
      dispatch(actions.signUp(credentials));
    }
  };
}

SignUpForm = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

SignUpForm = reduxForm({
  form: 'signUp',
  validate
})(SignUpForm);

module.exports = SignUpForm;
