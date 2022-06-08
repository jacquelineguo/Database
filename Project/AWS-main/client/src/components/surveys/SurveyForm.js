// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    // _.map() is used to deal with the fromFields array
    // and generate four fields
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          type="text"
          component={SurveyField}
          name={name}
          label={label}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {/* handleSubmit() is build-in function of reduxForm
        it will call the onSurveySubmit function once submitted*/}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {/* generate four fields */}
          {this.renderFields()}
          {/* cancel and return to Dashboard */}
          <Link to="/surveys" className='red btn-flat white-text'>
            Cancel
          </Link>
          {/* move forward to SurveyFormReview */}
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  // check if emails are valid
  // if recipients is empty, input empty string as parameter
  errors.recipients = validateEmails(values.recipients || '');
  // check if fields are empty
  _.each(formFields, ({ name }) => {
      if(!values[name]) {
        errors[name] = 'You must provide a value';
      }
  });

  return errors;
}

// reduxForm is used to save the form data into store
// the functionality of reduxForm is similar to connect()
export default reduxForm({
  // assign validate to a validate() function
  validate,
  form: 'surveyForm',
  // if unmounted, still keep the content inside of 'surveyForm'
  destroyOnUnmount: false
})(SurveyForm);
