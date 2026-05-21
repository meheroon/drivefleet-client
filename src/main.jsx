import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import AuthProvider from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";
import ThemeProvider from "./providers/ThemeProvider";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExploreCars from "./pages/ExploreCars";
import CarDetails from "./pages/CarDetails";
import AddCar from "./pages/AddCar";
import MyAddedCars from "./pages/MyAddedCars";
import MyBookings from "./pages/MyBookings";
import UpdateCar from "./pages/UpdateCar";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore-cars", element: <ExploreCars /> },
      { path: "/cars/:id", element: <CarDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/add-car",
        element: <PrivateRoute><AddCar /></PrivateRoute>,
      },
      {
        path: "/my-added-cars",
        element: <PrivateRoute><MyAddedCars /></PrivateRoute>,
      },
      {
        path: "/my-bookings",
        element: <PrivateRoute><MyBookings /></PrivateRoute>,
      },
      {
        path: "/update-car/:id",
        element: <PrivateRoute><UpdateCar /></PrivateRoute>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);