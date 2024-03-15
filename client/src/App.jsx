import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./styles/globals.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import Expense from "./pages/Expense/Expense";
import Income from "./pages/Income/Income";
import Chart from "./pages/Chart/Chart";
import Budget from "./pages/Budget/Budget";
import Refer from "./pages/Refer/Refer";
import { useState } from "react";
import Category from "./pages/Category/Category";

function App() {
  const handleToggle = () => {
    setMenuWidth(menuWidth === "250px" ? "85px" : "250px");
  };

  const [menuWidth, setMenuWidth] = useState("250");
  const Layout = () => {
    return (
      <div className="main">
        <Navbar handleToggle={handleToggle} />
        <div className="container">
          <div className="menuContainer" style={{ width: menuWidth }}>
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/expense",
          element: <Expense />,
        },
        {
          path: "/income",
          element: <Income />,
        },
        {
          path: "/chart",
          element: <Chart />,
        },
        {
          path: "/budget",
          element: <Budget />,
        },
        {
          path: "/refer",
          element: <Refer />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
