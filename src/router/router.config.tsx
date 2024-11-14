import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoadingScreen from "../components/common/LoadingScreen";

const Home = React.lazy(() => import("../pages/Home"));
const Continents = React.lazy(() => import("../pages/Continents"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/continents/:continentName",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Continents />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
