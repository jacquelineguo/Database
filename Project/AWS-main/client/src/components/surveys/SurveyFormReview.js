// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

// onCancel: click to move back to SurveyForm
// formValues: fields values
// submitSurvey: action creator
// history: used as router
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  // create fields for review
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <br/>
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      {/* once click, call the action creator */}
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right"> email</i>
      </button>
    </div>
  );
};
// get values of fields from state as props
function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}
// withRouter is used to implement the router
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
