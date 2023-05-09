import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  return (
    <section className="error-page">
      <h1>{error?.status + " : " + error?.statusText}</h1>
      <Link to="/" className="link-button">
        Return to Home
      </Link>
    </section>
  );
}
