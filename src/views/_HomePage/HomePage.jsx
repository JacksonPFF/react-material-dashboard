import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registeredGitasActions } from '_actions';
import { skipCodeConstants } from '_constants';
import { RegisteredGitasListItem } from './components';
import { searchFilter } from 'helpers';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  List,
  Box,
  Hidden,
} from '@material-ui/core';
import { SearchInput, TypographyWithSpacing } from 'components';


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
    const results = {};
    // Registered Gitas in redux state
    results.gitas = searchFilter(searchText, registeredGitas.items);
    // update store with filtered list
    dispatch(registeredGitasActions.filterItems(results));
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
                <RegisteredGitasListItem registeredGitas={registeredGitas} />
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
export default connectedHomePage;
