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

  render () {
    const handleSubmit = this.handleSubmit.bind(this);
    return (
      <div className='box'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username</label>
            <Field name='username' component={renderField} type='text' />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <Field name='password' component={renderField} type='password' />
          </div>
          <button type='submit' className='button is-success'>Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    formData: state.form.signIn.values
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
