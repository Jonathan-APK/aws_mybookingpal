import Landing from "./pages/Landing";
import Error from "./pages/Error";
import PartnerDashboard from "./pages/PartnerDashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import UserRegister from "./pages/UserRegister";
import PartnerRegister from "./pages/PartnerRegister";

function App() {
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
