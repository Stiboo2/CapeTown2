import { useEffect, useState } from "react";
import { useGlobalContext } from "./store/context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./LoginPage/firebase-config";
import RootLayout from "./components/Root";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import UnauthorizedPage from "./components/NotAuthorised/NotAuthorised";
import Error from "./components/Error";
import Meals from "./components/Meals/Meals";
import Database from "./components/UI/person/Database";
import UpdateMember from "./components/UpdateMember";
import BirthDay from "./components/BirthDays/BirthDay";
import SubmitProof from "./components/DropBox/SubmitProof";
import PaymentsList from "./components/DropBox/PaymentList";

const ProtectedRoute = ({ children }) => {
  const { myUser } = useGlobalContext();

  if (!myUser) {
    return <Navigate to="/unauthorizedpage" replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/unauthorizedpage",
    element: <UnauthorizedPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "sendreport",
    element: (
      <ProtectedRoute>
        <Meals />
      </ProtectedRoute>
    ),
  },
  {
    path: "SubmitProof",
    element: (
      <ProtectedRoute>
        <SubmitProof />
      </ProtectedRoute>
    ),
  },
  {
    path: "PaymentsList",
    element: (
      <ProtectedRoute>
        <PaymentsList />
      </ProtectedRoute>
    ),
  },
  {
    path: "churchDataBase",
    element: (
      <ProtectedRoute>
        <Database />
      </ProtectedRoute>
    ),
  },
  {
    path: "updateMember/:id",
    element: (
      <ProtectedRoute>
        <UpdateMember />
      </ProtectedRoute>
    ),
  },
  {
    path: "birthday",
    element: (
      <ProtectedRoute>
        <BirthDay />
      </ProtectedRoute>
    ),
  },
]);
let isInitial = true;
let isInitial2 = true;

function App(props) {
  const [user, setUser] = useState({});
  const [sendReports, setSendReports] = useState(false);
  const {
    setCartAtReducer,
    cart,
    notifications,
    notification,
    isSubmitting,
    setIsSubmitting,
  } = useGlobalContext();
  const [cartIsShown, setCartIsShown] = useState(false);

  useEffect(() => {
    // onAuthStateChanged listener to update the user state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      // Unsubscribe the onAuthStateChanged listener when the component unmounts
      unsubscribe();
    };
  }, []);

  //_______________loading____________________________
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchCartData = async () => {
    try {
      console.log("inside fetchCartData function");
      const response = await fetch(`${apiBaseUrl}/capetown.json`);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      console.log("cart data Fetched success.........");

      return data || [];
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const cartData = await fetchCartData();
      console.log("cartData", cartData);
      setCartAtReducer(cartData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("cart", cart);
  }, []);

  ////  _________________________________sending__________

  useEffect(() => {
    const sendCartData = async () => {
      const memberS = Array.from(cart.entries()).map(([id, item]) => ({
        id,
        ...item,
      }));
      notifications("pending", "Sending...", "Sending cart data!");
      const apiEndpoint = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiEndpoint}/capetown.json`, {
        method: "PUT",
        body: JSON.stringify(memberS),
      });
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      setIsSubmitting(false);
      notifications("success", "Success!", "Sent cart data successfully!");
    };

    // Rest of your code...
    // First condition
    if (isInitial) {
      isInitial = false;
      console.log("First condition");
      return;
    }

    // Second condition
    if (isInitial2) {
      isInitial2 = false;
      console.log("Second condition");
      return;
    }

    if (cart.size === 0) {
      // Cart is empty, no need to send data
      console.log("Cart is empty, no need to send data");
      return;
    }
    sendCartData().catch((error) => {
      notifications("error", "Error!", "Sending cart data failed!");
    });
  }, [isSubmitting]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
