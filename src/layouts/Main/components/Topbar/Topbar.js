import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
// import InputIcon from '@material-ui/icons/Input';
import { userActions } from '../../../../_actions';
import { connect } from 'react-redux';
import { PFFLogoSvg } from '../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  logoWhite : {
    width: 116,
    '& svg': {
      fill: '#fff'
    }
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.03)'
    }
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, dispatch, ...rest } = props;

  function handleLogout(e) {
    e.preventDefault();
    dispatch(userActions.logout());
  }

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink 
          className={classes.logoWhite}
          to="/"
        >
          <PFFLogoSvg />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

          <Button
            className={classes.signOutButton}
            color="inherit"
            component={RouterLink}
            onClick={handleLogout}
            to="/"
          >
            Sign out
          </Button>

        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};


function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
  };
}

// withRouter();
const connectedTopbar = connect(mapStateToProps)(Topbar);
//export { connectedTopbar as Topbar };
export default connectedTopbar;
