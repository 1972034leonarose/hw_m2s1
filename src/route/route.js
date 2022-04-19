import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { useSelector } from "react-redux";

function Routing() {
  const { isAuthorized } = useSelector((state) => state.auth);

  return (
    // TODO: check conditional routing; when not auth path directs to notfound
    <Router>
      <Routes>
        {isAuthorized && (<Route path="/home" element={<Home />} />)};
        <Route path="/" element={<LandingPage />} exact />
        {/* <Route path="*" element={<NotFound /> } exact /> */}
      </Routes>
    </Router>
  );
}

export { Routing };
