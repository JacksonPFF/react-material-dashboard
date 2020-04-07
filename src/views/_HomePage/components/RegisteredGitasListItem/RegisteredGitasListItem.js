import React from 'react';
import Moment from 'moment';
import {
  // ListItem,
  Box,
} from '@material-ui/core';
import { TypographyWithSpacing } from '../../../../components';


const RegisteredGitasListItem = (registeredGitas) => {
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

export default RegisteredGitasListItem;
