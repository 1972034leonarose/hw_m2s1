import React from "react";
// third-party
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
// components
import { PrivateRoute } from "../components/PrivateRoute";


function Routing() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} exact />
      </Routes>
    </Router>
  );
}

export { Routing };
