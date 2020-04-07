import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { otaInfoConstants } from '_constants';
import { OtaInfoListItem } from './components';

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  List,
  // ListItem,
  Box,
  Hidden,
} from '@material-ui/core';
import { SearchInput, TypographyWithSpacing } from 'components';
import { searchFilter } from 'helpers';

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

  useEffect(() => {
    dispatch({ type: otaInfoConstants.GETALL_REQUEST });
  }, []); // execute only once

  function handleSearchInput(e) {
    const searchText = e.target.value;
    // We only want to filter based on the properties visible to the user
    const visibleProperties = otaInfo.items.map((item) => ({
      // TODO: Need unique Id for React list key attribute,
      // but dont really want to filter by it if not visible to user...
      // can we exclude it from the filter somehow?
      id: item.id,
      live: item.live,
      versionName: item.versionName,
      versionCode: item.versionCode,
      minimumSupportedAppVersionCode: item.minimumSupportedAppVersionCode,
      created: item.created,
    }));

    const items = searchFilter(searchText, visibleProperties)
    // update store with filtered list
    dispatch({ type: otaInfoConstants.GETALL_FILTERED_ITEMS, items });
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
                <OtaInfoListItem otaInfo={otaInfo} />
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
export default connectedOtaInfoPage;
