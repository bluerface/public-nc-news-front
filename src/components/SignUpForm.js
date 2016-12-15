import React from 'react';
import { Field, reduxForm } from 'redux-form';

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
    const { handleSubmit } = this.props;
    return (
      <div className='box'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name</label>
            <Field name='name' component={renderField} type='text' />
          </div>
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

SignUpForm = reduxForm({
  form: 'signUp',
  validate
})(SignUpForm);

module.exports = SignUpForm;
