import ForgotPassword from "pages/Authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "pages/Authentication/ForgotPassword/ResetPassword";
import Login from "pages/Authentication/Login";
import Dashboard from "pages/Dashboard";
import React from "react";
import { Route, Routes, Switch } from "react-router-dom";




const AuthRoutes = () => {
  return (

    <Switch>
      <Route path="/admin/" render={() => { return (<Login />) }} />
      <Route path="/forgot-password" render={() => { return (<ForgotPassword />) }} />
      <Route path="/reset-password" render={() => { return (<ResetPassword />) }} />

    </Switch>

  );
};

export default AuthRoutes;
