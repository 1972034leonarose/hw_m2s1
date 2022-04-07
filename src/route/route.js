import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import { useSelector } from "react-redux";

const Routing = () => {
  const { isAuthorized } = useSelector((state) => state.auth);
  return (
    <Router>
      <div className="btn-login">
        {/* landing page */}
        <Link to="/">Login</Link>
      </div>

      <div className="btn-login">
        {/* to playlist page */}
        <Link to="/home">Create Playlist</Link>
      </div>

      <Switch>
        <Route path="/home">
          {isAuthorized ? (
            <Home />
          ) : (
            <Redirect exact from="/home" to="/" />
          )}
        </Route>

        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export { Routing };
