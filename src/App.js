import Landing from "./pages/Landing";
import Error from "./pages/Error";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import ManageFacility from "./pages/partner/ManageFacility";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import UserRegister from "./pages/auth/UserRegister";
import PartnerRegister from "./pages/auth/PartnerRegister";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import UserDashboard from "./pages/user/UserDashboard";
import FacilitiesList from "./pages/user/FacilitiesList";
import ManageBooking from "./pages/user/ManageBooking";
import FacilityDetails from "./pages/user/FacilityDetails";
import UserProfile from "./pages/user/UserProfile";
import Payment from "./pages/payment/StripeContainer"

Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} path="/" component={Landing} exact />

          <PrivateRoute path="/dashboard" component={PartnerDashboard} exact />

          <PrivateRoute
            path="/managefacility"
            component={ManageFacility}
            exact
          />

          <PublicRoute
            restricted={true}
            path="/login"
            component={Login}
            exact
          />

          <PublicRoute
            restricted={false}
            path="/userregister"
            component={UserRegister}
            exact
          />

          <PublicRoute
            restricted={false}
            path="/partnerregister"
            component={PartnerRegister}
            exact
          />

          <PublicRoute
            restricted={false}
            path="/forgotpassword"
            component={ForgotPassword}
            exact
          />

          <PublicRoute
            restricted={false}
            path="/resetpassword"
            component={ResetPassword}
            exact
          />

          <PrivateRoute path="/userdashboard" component={UserDashboard} exact />

          <PrivateRoute
            path="/facilitieslist"
            component={FacilitiesList}
            exact
          />

          <PrivateRoute path="/managebooking" component={ManageBooking} exact />

          <PrivateRoute
            path="/facilitydetails"
            component={FacilityDetails}
            exact
          />

          <PrivateRoute path="/userprofile" component={UserProfile} exact />

          <PrivateRoute path="/payment" component={Payment} exact />

          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
