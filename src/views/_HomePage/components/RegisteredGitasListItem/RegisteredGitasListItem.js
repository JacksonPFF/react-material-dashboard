import React from 'react';
import Moment from 'moment';
import {
  // ListItem,
  Box,
  Typography,
} from '@material-ui/core';


const RegisteredGitasListItem = (props) => {
  const { registeredGitas } = props;

  return (
    <React.Fragment>
      {registeredGitas.filteredItems.map((gita) => (
        <li key={gita.serial} >
          <Box mb={2}>
            <Typography
              variant="body1"
            >
              <b>Serial:</b> {gita.serial}
            </Typography>
            <Typography
              variant="body1"
            >
              <b>Name:</b> {gita.name}
            </Typography>
            <Typography
              variant="body1"
            >
              <b>Registered by:</b> {gita.registeredByUsername}
            </Typography>
            <Typography
              variant="body1"
            >
              <b>Email:</b> {gita.registeredByEmail}
            </Typography>
            <Typography
              variant="body1"
            >
              <b>Date:</b> {Moment(gita.created).format('DD/MM/YYYY')}
            </Typography>
          </Box>
        </li>))}
    </React.Fragment>
  );
}

// TODO: add propTypes

export default RegisteredGitasListItem;
