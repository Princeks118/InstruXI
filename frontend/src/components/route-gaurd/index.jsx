import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  // 1. Not authenticated & not on /auth => redirect to /auth
  if (!authenticated && !location.pathname.startsWith("/auth")) {
    return <Navigate to="/auth" replace />;
  }

  // 2. Authenticated but not instructor & trying to access instructor or auth routes
  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.startsWith("/instructor") || location.pathname.startsWith("/auth"))
  ) {
    return <Navigate to="/home" replace />;
  }

  // 3. Authenticated instructor trying to access student views
  if (
    authenticated &&
    user?.role === "instructor" &&
    !location.pathname.startsWith("/instructor")
  ) {
    return <Navigate to="/instructor" replace />;
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
