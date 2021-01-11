import "rsuite/dist/styles/rsuite-default.css";
import "./App.css";
import "./custom-style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Sidenav from "./components/sidebar/Sidenav";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div>
          <Sidenav />
        </div>
        <div style={{ flex: 1 }}>
          <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
