import { Provider } from "react-redux";
import { store } from "./api/store";
import useWebsockets from "./hooks/useWebsocket";
import "./styles/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout/Root";
import Auth from "./screens/Auth/Auth";
import Cookies from "js-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // loader: rootLoader,
    children: [
      {
        path: "rooms",
        element: <></>,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "signin",
        element: <Auth type="signin" />,
      },
    ],
  },
]);

const Application = () => {
  const res = useWebsockets({
    room: "room:lobby",
    token: JSON.parse(Cookies.get("user") ?? "")?.token ?? "",
    onNewMessage: () => {
      console.log("new message");
    },
  });

  console.log(res);

  return (
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    // </ErrorBoundary>
  );
};

export default Application;
