import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  return (
    <div>
      <SurveyList />
      {/* this is the 'add' button with materialize CSS */}
      <div className="fixed-action-btn">
        {/* using link tag for router in the server */}
        <Link to="/surveys/new" className="btn-floating btn-large green">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
