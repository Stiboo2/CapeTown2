import Home from "./components/Home";
import RootLayout from "./components/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UnauthorizedPage from "./components/NotAuthorised/NotAuthorised";
import Error from "./components/Error";
import SubmitProof from "./components/DropBox/SubmitProof";
import PaymentsList from "./components/DropBox/PaymentList";
import ImageComponent from "./components/DropBox/ImageComponent";
import CashBook from "./components/CashBook/CashBook";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "unauthorizedpage", element: <UnauthorizedPage /> },
      { path: "SubmitProof", element: <SubmitProof/>},
      { path: "PaymentsList", element: <PaymentsList /> },
      { path: "/image/:id", element: <ImageComponent />},
      { path: "cashbook", element: <CashBook /> },
    ],
  },
]);
function Application(props) {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default Application;