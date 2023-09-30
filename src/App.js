import { Container } from "react-bootstrap";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AddNewCategory from "./components/admin/manageCategory/AddNewCategory";
import PendingblogsTable from "./components/admin/pendingBlogs/pendingBlogsTable/PendingblogsTable";
import Footer from "./components/shared/footer/Footer";
import Header from "./components/shared/header/Header";
import PrivateRoute from "./components/shared/privateRoute/PrivateRoute";
import Admin from "./pages/admin/Admin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Profile from "./pages/user/Profile";
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

const UserPanel = () => {
  return (
    <section className="section-height">
      <h3 className="text-center my-3">User Panel</h3>
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
        element: (
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        ),
        children: [
          {
            path: "pending-blogs/:pageNumber",
            element: <PendingblogsTable />,
          },
          {
            path: "manage-category",
            element: <AddNewCategory />,
          },
        ],
      },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <UserPanel />
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
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
  return <RouterProvider router={router} />;
}

export default App;
