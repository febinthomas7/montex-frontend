import { createBrowserRouter } from "react-router-dom";
import { lazy, useState, useEffect, useContext } from "react";
import CheckoutPage from "../pages/CheckoutPage";
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
