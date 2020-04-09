import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { registeredGitasActions } from '_actions';
import { RegisteredGitasTable } from './components';

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

function RegisteredGitasList(props) {
  const { registeredGitas, dispatch } = props;

  const classes = useStyles();

  useEffect(() => {
    dispatch(registeredGitasActions.getAll());
  }, []); // execute only once

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        spacing={4}
      >
        <Grid
          item
        // md={4}
        // sm={6}
        >
          {registeredGitas.loading && <em>Loading Registered Gitas List info list...</em>}
          {registeredGitas.error &&
            <span className="text-danger">
              ERROR:
              {registeredGitas.error}
            </span>}
          {registeredGitas.filteredItems &&
            <RegisteredGitasTable registeredGitas={registeredGitas} />
          }
          {/* <TableExample /> */}
        </Grid>
      </Grid>
    </div>
  );
}

RegisteredGitasList.propTypes = {
  registeredGitas: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.string,
    items: PropTypes.array,
    filteredItems: PropTypes.array,
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { registeredGitas } = state;
  return {
    registeredGitas,
  };
}

const connectedRegisteredGitasList = connect(mapStateToProps)(RegisteredGitasList);
export default connectedRegisteredGitasList;
