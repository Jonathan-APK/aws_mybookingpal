import Landing from "./pages/Landing";
import Error from "./pages/Error";
import PartnerDashboard from "./pages/PartnerDashboard";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
