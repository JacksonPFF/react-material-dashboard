import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'moment';
import { registeredGitasActions } from '../_actions';
import { skipCodeConstants } from '../_constants';


function HomePage(props) {
  const { registeredGitas, skipCode, dispatch } = props;

  useEffect(() => {
    dispatch(registeredGitasActions.getAll());
    dispatch({ type: skipCodeConstants.SKIPCODE_POLL_START });
    return function cleanup() {
      dispatch({ type: skipCodeConstants.SKIPCODE_POLL_STOP });
    };
  }, []); // execute only once

  function handleSearchInput(e) {
    const searchText = e.target.value;
    // Registered Gitas in redux state
    const objects = registeredGitas.items;
    const results = {};
    results.gitas = _.filter(objects, (gita) => // each gita
                      _.filter(_.values(gita), (gitaPropertyValue) => // each value on in gita
                        _.includes(gitaPropertyValue.toLowerCase(), searchText.toLowerCase())).length > 0);
    // update store with filtered list
    dispatch(registeredGitasActions.filterItems(results));
  }

  function registeredGitaListItem() {
    return (
      <React.Fragment>
        {registeredGitas.filteredItems.map((gita) => (
          <li key={gita.serial} className="mb-3">
            <div>
              <b>Serial:</b> {gita.serial}
            </div>
            <div>
              <b>Name:</b> {gita.name}
            </div>
            <div>
              <b>Registered by:</b> {gita.registeredByUsername}
            </div>
            <div>
              <b>Email:</b> {gita.registeredByEmail}
            </div>
            <div>
              <b>Date:</b> {Moment(gita.created).format('DD/MM/YYYY')}
            </div>
          </li>))}
      </React.Fragment>
    );
  }

  return (
    <div className="row">
      <div className="col-md-6 col-lg-3">
        <div className="sticky-top">
          <h4>Registered Gitas</h4>
          <p>From secure api endpoint</p>

          <input
            className="filter form-control mb-3"
            onInput={handleSearchInput}
            type="text"
            placeholder="Search for..."
          />

          {registeredGitas.loading && <em>Loading registered gitas...</em>}
          {registeredGitas.error &&
            <span className="text-danger">
              ERROR:
              {registeredGitas.error}
            </span>}
          {registeredGitas.filteredItems &&
          <div>
            <ul className="list-unstyled">
              {registeredGitaListItem()}
            </ul>
          </div>}
        </div>
      </div>

      <div className="d-none d-lg-block col-md-3" />

      <div className="col-md-6 col-lg-3 mt-3 mt-sm-0">
        <h4> Wifi Skip Code </h4>
        <p className="mb-0">Updates every 15 minutes.</p>
        <p>Valid for 30 minutes.</p>
        <h1><b>{skipCode.data}</b></h1>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  registeredGitas: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.string,
    items: PropTypes.array,
    filteredItems: PropTypes.array,
  }).isRequired,

  skipCode: PropTypes.shape({
    data: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    polling: PropTypes.bool.isRequired,
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { registeredGitas, skipCode } = state;
  return {
    registeredGitas,
    skipCode,
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
