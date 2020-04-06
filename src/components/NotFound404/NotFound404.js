import React from 'react';

const NotFound404 = () => (
  // TODO: resolve depency issue for: const location = useLocation();
  <div className="vh-100 d-flex">
    <div className="w-100 align-self-center text-center">
      <h1>404</h1>
      <h3>
        URL not found.
        {/* No match for <code>{location.pathname}</code> */}
      </h3>
    </div>
  </div>
);

export default NotFound404;
