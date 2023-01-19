import { Container } from "react-bootstrap";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AddNewAdmin from "./components/admin/addNewAdmin/AddNewAdmin";
import PendingblogsTable from "./components/admin/pendingBlogs/pendingBlogsTable/PendingblogsTable";
import Footer from "./components/shared/footer/Footer";
import Header from "./components/shared/header/Header";
import PrivateRoute from "./components/shared/privateRoute/PrivateRoute";
import Admin from "./pages/admin/Admin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

const AdminPanel = () => {
  return (
    <section className="section-height">
      <Admin />
      <Outlet />
    </section>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: (
          <PrivateRoute>
            <Write />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: <AdminPanel />,
        children: [
          {
            path: "pending-blogs/:pageNumber",
            element: <PendingblogsTable />,
          },
          {
            path: "add-new-admin",
            element: <AddNewAdmin />,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
