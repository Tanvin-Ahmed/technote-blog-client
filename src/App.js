import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/shared/header/Header";
import Footer from "./components/shared/footer/Footer";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { Container } from "react-bootstrap";
import Admin from "./pages/admin/Admin";
import PendingblogsTable from "./components/admin/pendingBlogs/pendingBlogsTable/PendingblogsTable";
import AddNewAdmin from "./components/admin/addNewAdmin/AddNewAdmin";

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
        element: <Write />,
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
