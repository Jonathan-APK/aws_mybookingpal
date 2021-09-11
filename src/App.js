import Landing from "./pages/Landing";
import Error from "./pages/Error";
import PartnerDashboard from "./pages/PartnerDashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/Login";
import UserRegister from "./pages/auth/UserRegister";
import PartnerRegister from "./pages/auth/PartnerRegister";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import UserDashboard from "./pages/user/UserDashboard";
import FacilitiesList from "./pages/user/FacilitiesList";
import ManageBooking from "./pages/user/ManageBooking";
import FacilityDetails from "./pages/user/FacilityDetails";

Amplify.configure(awsconfig)

function App() {

  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   AssessLoggedInState()
  // }, [])

  // const AssessLoggedInState = () => {
  //   Auth.currentAuthenticatedUser().then(() =>{
  //     setLoggedIn(true);
  //   }).catch(() => {
  //     setLoggedIn(false);
  //   })
  // }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/error" exact>
            <Error />
          </Route>
          <Route path="/dashboard" exact>
            <PartnerDashboard />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/userregister" exact>
            <UserRegister />
          </Route>
          <Route path="/partnerregister" exact>
            <PartnerRegister />
          </Route>
          <Route path="/forgotpassword" exact>
            <ForgotPassword />
          </Route>
          <Route path="/resetpassword" exact>
            <ResetPassword />
          </Route>
          <Route path="/userdashboard" exact>
            <UserDashboard />
          </Route>
          <Route path="/facilitieslist" exact>
            <FacilitiesList />
          </Route>
          <Route path="/managebooking" exact>
            <ManageBooking />
          </Route>
          <Route path="/facilitydetails" exact>
            <FacilityDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
