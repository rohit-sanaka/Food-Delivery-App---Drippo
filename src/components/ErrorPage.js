import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="error-page">
      <h1>{error.message}</h1>
      <Link to="/" className="link-button">
        Return to Home
      </Link>
    </div>
  );
}
