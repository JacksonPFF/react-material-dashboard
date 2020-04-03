import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history } from '../_helpers';
import { userActions } from '../_actions';
// import '../_scss/LoginPage.scss';
import { PFFLogoSvg, LoadingGif } from '../_components';

function LoginPage(props) {
  // TODO: update propTypes
  const { user, loggingIn, alert, dispatch } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     history.push('/app');
  //   }
  // }, []); // execute only once

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: look into lint "unexpected use of event"
    e.target.className += ' was-validated';

    setIsSubmitted(!isSubmitted);
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  return (
    <div className="min-vh-100 d-flex">
      <div className="container d-flex flex-column justify-content-center">

        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="mb-5">
              <PFFLogoSvg />
            </div>
            <h3 className="text-center">Sign In</h3>
            <p className="text-center mb-5">Welcome to the admin portal!</p>
            <form name="form" className="needs-validation" onSubmit={handleSubmit} noValidate>
              <div className={'form-group' + (isSubmitted && !email ? ' has-danger' : '')}>
                <label htmlFor="email">Email or Username</label>
                <input type="text" className="form-control" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="invalid-feedback">Email is required</div>
              </div>
              <div className={'form-group' + (isSubmitted && !password ? ' has-danger' : '')}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="invalid-feedback">Password is required</div>
              </div>
              <div className="form-group text-center">
                <button className="btn btn-primary w-100" type="submit">Login</button>
                {loggingIn && <LoadingGif /> }
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 offset-md-4">
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
          </div>
        </div>

      </div>
    </div>
  );
}

// evidently if a prop is not required
// a default must be declared
LoginPage.defaultProps = {
  loggingIn: false,
};

LoginPage.propTypes = {
  loggingIn: PropTypes.bool,

  alert: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { alert } = state;
  const { loggingIn } = state.authentication;
  const { user } = state.authentication;
  return {
    alert,
    loggingIn,
    user,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
