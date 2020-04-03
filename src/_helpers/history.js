import { createBrowserHistory } from 'history';
// custom history object instead of the one built into React Router
// Enables redirecting users from outside React components
// for example from the user actions after successful login.
export const history = createBrowserHistory();
