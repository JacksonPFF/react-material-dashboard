import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import { PFFLogoSvg } from '../../../../_components';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  logoWhite : {
    width: 116,
    '& svg': {
      fill: '#fff'
    }
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink 
          className={classes.logoWhite}
          to="/"
        >
          <PFFLogoSvg />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
