import React from 'react';
import Moment from 'moment';
import {
  // ListItem,
  Box,
  Typography,
} from '@material-ui/core';
import { SpanUtility  } from 'components';
import { useTheme } from '@material-ui/core/styles';
import { capFirst } from 'helpers';

// PROPERTIES ON OTAs
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

const OtaInfoListItem = (props) => {
  const { otaInfo } = props;

  const theme = useTheme();
  
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

// TODO: add propTypes

export default OtaInfoListItem;
