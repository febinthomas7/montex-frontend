import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

const Settings = lazy(() => import("../pages/Settings"));

const Home = lazy(() => import("../pages/home"));
const Products = lazy(() => import("../pages/Products"));
const PageNotFound = lazy(() => import("../component/PageNotFound"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));

const ReelsPage = lazy(() => import("../pages/ReelsPage"));
const SuccessPage = lazy(() => import("../pages/SuccessPage"));
const CancelPage = lazy(() => import("../pages/CancelPage"));

const SignIn = lazy(() => import("../pages/SignIn"));

const Login = lazy(() => import("../pages/Login"));

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or check your auth context

  // If user is logged in, redirect to home (or dashboard)
  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signin",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },

  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/reels",
    element: <ReelsPage />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
  {
    path: "/canceled",
    element: <CancelPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
