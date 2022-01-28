import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { Layout } from 'lib/components';

export const PrivateRoute = ({
  component: PrivateComponent,
  ...otherProps
}) => {
  /*
   Logic to check if user is logged in
  */

  let loggedIn = false;
  const loggedInState = useSelector((state) => state?.loginStats);

  const authState = useSelector((state) => state?.auth);

  if (loggedInState?.token || loggedInState?.googleToken || authState?.token) {
    loggedIn = true;
  }

  loggedIn = true;

  return (
    <Route
      {...otherProps}
      render={(props) =>
        loggedIn ? (
          <PrivateComponent {...props} />
        ) : (
          <Redirect to={{ pathname: '/signin' }} {...otherProps} />
        )
      }
    />
  );
};
