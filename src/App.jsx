import { BrowserRouter, createBrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";


import ProtectedRoute from "./pages/ProtectedRoute";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";
import MasterLayout from "./pages/MasterLayout/MasterLayout";

// import Product from "./pages/Product/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout/AppLayout";
// import Login from "./pages/Login/Login";
// import Homepage from "./pages/Homepage/Homepage";
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Product = lazy(() => import("./pages/Product/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const Login = lazy(() => import("./pages/Login/Login"));
function App() {
  const router = createBrowserRouter([
    {
      path: "", 
      element: <MasterLayout />, 
      children: [
        { index: true, element: <Homepage /> },
        { path: "product", element: <Product /> },
        { path: "pricing", element: <Pricing /> },
        { path: "login", element: <Login /> }
      ]
    },
    {
      path: "app", 
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate replace to="cities" /> },
        { path: "cities/:id", element: <City /> },
        { path: "cities", element: <CityList /> },
        { path: "countries", element: <CountryList /> },
        { path: "form", element: <Form /> }
      ]
    },
    { path: "*", element: <PageNotFound /> } // Catch-all for undefined routes
  ]);
  return (
    <AuthProvider>
      <CitiesProvider>
        <Suspense fallback={<SpinnerFullPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
