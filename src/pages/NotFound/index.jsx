import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="my-56 mx-24">
      <section id="title">
        <h1 className="text-5xl font-bold py-3">404</h1>
        <h1 className="text-5xl">Page Not Found</h1>
      </section>

      <section id="subheading">
        <h5 className="text-xl leading-normal mt-5 mb-4">
          <Link to="/">Head home</Link>
        </h5>
      </section>
    </div>
  );
}

export default NotFound;
