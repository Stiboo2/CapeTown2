import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppProvider } from "./store/context";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./store/user_context";
import Application from "./Application";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-sjaab2d5z7kz5b1h.us.auth0.com"
    clientId="7FFPggN3ALreiMVZ4shkhkqrvZ70pDxT"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <React.StrictMode>
      <UserProvider>
        <AppProvider>
          <Application />
        </AppProvider>
      </UserProvider>
    </React.StrictMode>
  </Auth0Provider>
);
