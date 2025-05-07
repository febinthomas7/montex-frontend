import { createBrowserRouter } from "react-router-dom";
import { lazy, useState, useEffect, useContext } from "react";
import CheckoutPage from "../pages/CheckoutPage";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
const Settings = lazy(() => import("../pages/Settings"));

const Home = lazy(() => import("../pages/home"));
const Products = lazy(() => import("../pages/Products"));
const PageNotFound = lazy(() => import("../component/PageNotFound"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));

const ReelsPage = lazy(() => import("../pages/ReelsPage"));
const CartPage = lazy(() => import("../pages/CartPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <SignIn />,
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
    path: "/checkout",
    element: <CheckoutPage />,
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
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
