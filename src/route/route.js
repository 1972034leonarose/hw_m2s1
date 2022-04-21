import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import { PrivateRoute } from "../components/PrivateRoute";
import NotFound from "../pages/NotFound";

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
