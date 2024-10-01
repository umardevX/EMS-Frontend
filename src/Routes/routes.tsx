import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import { PrivateRoute } from "./ProtectedRoute";
import { useCheckAuthToken } from "../hooks/useCheckAuthToken ";
import Page404 from "../pages/Page404/Page404";
import Dashboard from "../pages/dashboard/Dashboard/Dashboard";
import { Navigate, useRoutes } from "react-router-dom";

export default function Router() {
    const routes = useRoutes([

        {
            path: "/",
            element: <SignIn />
        },

        {
            path: "signin",
            element: <SignIn />
        },

        {
            path: "signup",
            element: <SignUp />
        },

        {
            path: "dashboard/*",
            element: (
                <PrivateRoute
                    element={<Dashboard />}
                    isAuthenticated={useCheckAuthToken}
                />
            ),
            
        },
        {
            path: "404",
            element: <Page404 />,
          },
      
          {
            path: "*",
            element: <Navigate to="/404" replace />,
          },
    ])
    return routes;
}


