// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUserContext } from "../store/user_context";

const PrivateRoute = ({ element, requireAuth = true, ...rest }) => {
  const { myUser } = useUserContext();

  // Check if authentication is required and the user is authenticated
  if (requireAuth && !myUser) {
    // Redirect to the login page if authentication is required but the user is not authenticated
    return <Navigate to="/unauthorizedpage" />;
  }

  // Render the route element if authentication is not required or the user is authenticated
  return <Route element={element} {...rest} />;
};

export default PrivateRoute;
// https://www.google.com/search?q=reace+hide+route+using+firebase+login&rlz=1C1CHBF_enZA1083ZA1085&oq=re&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIGCAEQRRg5MgwIAhAjGCcYgAQYigUyEwgDEC4YgwEYxwEYsQMY0QMYgAQyDQgEEAAYgwEYsQMYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyNTY0ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8