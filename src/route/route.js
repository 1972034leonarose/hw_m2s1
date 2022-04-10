import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LandingPage />} exact />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export { Routing };
