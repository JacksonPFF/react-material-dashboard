import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'moment';
import { otaInfoConstants } from '../_constants';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  List,
  // ListItem,
  Box,
  Hidden,
  Typography,
} from '@material-ui/core';
import { SearchInput, TypographyWithSpacing, SpanUtility } from '../components';
import { useTheme } from '@material-ui/core/styles';

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

function OtaInfoPage(props) {
  const { otaInfo, dispatch } = props;

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    dispatch({ type: otaInfoConstants.GETALL_REQUEST });
  }, []); // execute only once

  function handleSearchInput(e) {
    const searchText = e.target.value;
    // We only want to filter based on the properties visible to the user
    const objects = otaInfo.items.map((item) => ({
      live: item.live,
      versionName: item.versionName,
      versionCode: item.versionCode,
      minimumSupportedAppVersionCode: item.minimumSupportedAppVersionCode,
      created: item.created,
    }));
    // TODO: search only the properties in the list view
    const items = _.filter(objects, (ota) => // each ota
      _.filter(_.values(ota), (otaPropertyValue) => // each value on in ota
        _.includes(otaPropertyValue.toString().toLowerCase(), searchText.toLowerCase())).length > 0);
    // update store with filtered list
    dispatch({ type: otaInfoConstants.GETALL_FILTERED_ITEMS, items });
  }

  //       "deleted": false,
  //       "live": false,
  //       "deprecated": false,
  //       "unsupported": false,
  //       "displayNotes": "This is the software update for version 2.0.0, it contains feature 3, feature 4, and feature 5",
  //       "uploadedDate": "2020-03-22T20:03:58.392Z",
  //       "versionName": "2.0.0",
  //       "versionCode": 10,
  //       "minimumSupportedAppVersionCode": 9,
  //       "internalNotes": "",
  //       "modified": "2020-03-22T20:03:58.514Z",
  //       "created": "2020-03-22T20:03:58.392Z",
  //       "id": "5e77c4aeba7a9d002949d2eb"

  function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // eslint-disable-next-line react/no-multi-comp
  function otaInfoListItem() {
    return (
      <React.Fragment>
        {otaInfo.filteredItems.map((ota) => (
          <li
            className="mb-3"
            key={ota.id}
          >
            <Box mb={2}>

              <Typography
                variant="body1"
              >
                <b>Live:</b>
                <SpanUtility
                  color={ota.live ? `${theme.palette.success.main}` : `${theme.palette.error.main}`}
                > 
                  {` ${capFirst(ota.live.toString())}`} 
                </SpanUtility>
              </Typography>

              <Typography variant="body1">
                <b>Version Name:</b> {ota.versionName}
              </Typography>
              <Typography variant="body1">
                <b>Version Code:</b> {ota.versionCode}
              </Typography>
              <Typography variant="body1">
                <b>Minimum Supported App Code:</b> {ota.minimumSupportedAppVersionCode}
              </Typography>
              <Typography variant="body1">
                <b>Date:</b> {Moment(ota.created).format('DD/MM/YYYY')}
              </Typography>
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
            OTA Info List View
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
          {otaInfo.loading && <em>Loading OTA info list...</em>}
          {otaInfo.error &&
            <span className="text-danger">
              ERROR:
              {otaInfo.error}
            </span>}
          {otaInfo.filteredItems &&
            <div>
              <List>
                {otaInfoListItem()}
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
        />
      </Grid>
    </div>
  );
}

OtaInfoPage.propTypes = {
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

const connectedOtaInfoPage = connect(mapStateToProps)(OtaInfoPage);
export { connectedOtaInfoPage as OtaInfoPage };
