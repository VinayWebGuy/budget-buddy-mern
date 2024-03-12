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
import Reports from "./pages/Reports/Reports";
import Refer from "./pages/Refer/Refer";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
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
          path: "/reports",
          element: <Reports />,
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
