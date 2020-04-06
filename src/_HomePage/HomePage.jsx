import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'moment';
import { registeredGitasActions } from '../_actions';
import { skipCodeConstants } from '../_constants';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  List,
  // ListItem,
  Box,
  Hidden,
} from '@material-ui/core';
import { SearchInput, TypographyWithSpacing } from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  }
}));

function HomePage(props) {
  const { registeredGitas, skipCode, dispatch } = props;

  const classes = useStyles();

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
          <li key={gita.serial} >
            <Box mb={2}>
              <TypographyWithSpacing
                variant="body1"
              >
                <b>Serial:</b> {gita.serial}
              </TypographyWithSpacing>
              <TypographyWithSpacing
                variant="body1"
              >
                <b>Name:</b> {gita.name}
              </TypographyWithSpacing>
              <TypographyWithSpacing
                variant="body1"
              >
                <b>Registered by:</b> {gita.registeredByUsername}
              </TypographyWithSpacing>
              <TypographyWithSpacing
                variant="body1"
              >
                <b>Email:</b> {gita.registeredByEmail}
              </TypographyWithSpacing>
              <TypographyWithSpacing
                variant="body1"
              >
                <b>Date:</b> {Moment(gita.created).format('DD/MM/YYYY')}
              </TypographyWithSpacing>
            </Box>
          </li>))}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        spacing={4}
      >
        <Grid
          item
          md={3}
          sm={6}
        >
          <TypographyWithSpacing
            gutterBottom
            variant="h4"
          >
            Registered Gitas
          </TypographyWithSpacing>
          <TypographyWithSpacing
            variant="subtitle2"
          >
            From secure api endpoint
          </TypographyWithSpacing>
          <Box visibility="hidden">
            <TypographyWithSpacing
              gutterBottom
              variant="subtitle2"
            > -
            </TypographyWithSpacing>
          </Box>
          <Box mb={2}>
            <SearchInput
              onInput={handleSearchInput}
              placeholder="Search for..."
              type="text"
            />
          </Box>

          {registeredGitas.loading && <em>Loading registered gitas...</em>}
          {registeredGitas.error &&
            <span className="text-danger">
              ERROR:
              {registeredGitas.error}
            </span>}
          {registeredGitas.filteredItems &&
            <div>
              <List>
                {registeredGitaListItem()}
              </List>
            </div>}
        </Grid>
        <Hidden smDown>
          <Grid
            item
            md={3}
          />
        </Hidden>
        <Grid
          item
          md={3}
          sm={6}
        >
          <TypographyWithSpacing
            gutterBottom
            variant="h4"
          >
            Wifi Skip Code
          </TypographyWithSpacing>
          <TypographyWithSpacing
            variant="subtitle2"
          >
            Updates every 15 minutes.
          </TypographyWithSpacing>
          <TypographyWithSpacing
            gutterBottom
            variant="subtitle2"
          >
            Valid for 30 minutes.
          </TypographyWithSpacing>
          <TypographyWithSpacing
            variant="h1"
          >
            <b>{skipCode.data}</b>
          </TypographyWithSpacing>
        </Grid>
      </Grid>
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
