import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Success from "./pages/Success";
import Orders from "./pages/Orders";

function Layout() {
  return (
    <section className="h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/cart", element: <Cart /> },

        {
          path: "/orders",
          element: <Orders />,
        },
        { path: "/success", element: <Success /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
