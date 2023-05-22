import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./screens/pages/HomePage";
import NotFoundPage from "./screens/pages/NotFoundPage";
import RegisterPage from "./screens/pages/auth/Register";
import ForgotPasswordPage from "./screens/pages/ForgotPwdPage";
import ResetPasswordPage from "./screens/pages/ResetPwdPage";

import Dashboard from "./layouts/dashboard-layout";
import DashboardDefaultContent from "./screens/dashboard/dashboard-default-content";
import AddProductView from "./screens/pages/addProduct/AddProductView";
import IssueReport from "./components/IssueReport";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetail from "./components/ProductDetail";
import EditProductView from "./screens/pages/editProduct/EditProductView";
import ProfileView from "./screens/pages/profile/ProfileView";
import EditProfileView from "./screens/pages/profile/EditProfileView";
import CalendarView from "./screens/pages/calender";
import PieView from "./screens/pages/charts/PieView";
import Security from "./screens/pages/profile/Security";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/login" component={HomePage} />
      <Route exact path="/forgot" component={ForgotPasswordPage} />
      <Route exact path="/resetPwd/:resetToken" component={ResetPasswordPage} />
      <Route exact path="/not-found" component={NotFoundPage} />

      {/* dashboard sidebar options */}
      <ProtectedRoute
        path={"/dashboard"}
        render={({ match: { path } }) => (
          <Dashboard>
            <Switch>
              <Route
                exact
                path={path + "/dashboard"}
                component={DashboardDefaultContent}
              />
              <Route
                exact
                path={path + "/product-detail/:id"}
                component={ProductDetail}
              />
              <Route
                exact
                path={path + "/edit-product/:id"}
                component={EditProductView}
              />
              <Route exact path={path + "/profile"} component={ProfileView} />
              <Route
                exact
                path={path + "/edit-profile"}
                component={EditProfileView}
              />
              <Route exact path={path + "/security"} component={Security} />
              <Route exact path={path + "/add"} component={AddProductView} />
              <Route exact path={path + "/issue"} component={IssueReport} />
              <Route exact path={path + "/schedule"} component={CalendarView} />
              <Route exact path={path + "/pie"} component={PieView} />
            </Switch>
          </Dashboard>
        )}
      />
      <Redirect exact from={"*"} to={"/not-found"} />
    </Switch>
  );
};

export default Routes;
