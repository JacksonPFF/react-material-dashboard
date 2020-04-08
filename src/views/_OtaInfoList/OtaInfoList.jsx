import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { otaInfoConstants } from '_constants';
import { OtaInfoTable } from './components';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

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

function OtaInfoList(props) {
  const { otaInfo, dispatch } = props;

  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: otaInfoConstants.GETALL_REQUEST });
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
          {otaInfo.loading && <em>Loading OTA info list...</em>}
          {otaInfo.error &&
            <span className="text-danger">
              ERROR:
              {otaInfo.error}
            </span>}
          {otaInfo.filteredItems &&
            <OtaInfoTable otaInfo={otaInfo} />
          }
          {/* <TableExample /> */}
        </Grid>
      </Grid>
    </div>
  );
}

OtaInfoList.propTypes = {
  otaInfo: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.string,
    items: PropTypes.array,
    filteredItems: PropTypes.array,
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { otaInfo } = state;
  return {
    otaInfo,
  };
}

const connectedOtaInfoList = connect(mapStateToProps)(OtaInfoList);
export default connectedOtaInfoList;
