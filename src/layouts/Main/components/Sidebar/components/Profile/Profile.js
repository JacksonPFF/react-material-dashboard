import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { user, className, dispatch, ...rest } = props;

  const classes = useStyles();

  // const user = {
  //   name: 'Shen Zhi',
  //   avatar: '/images/avatars/avatar_11.png',
  //   bio: 'Brain Director'
  // };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.profilePicture}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.username}
      </Typography>
      <Typography variant="body2">{user.role}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};


function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user,
  };
}

const connectedProfile = connect(mapStateToProps)(Profile);
export default connectedProfile;
