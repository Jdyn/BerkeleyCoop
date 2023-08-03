import "./styles/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout/Root";
import Auth from "./screens/Auth/Auth";
import Chat from "./screens/Chat/Chat";
import Events from "./screens/Events/Events";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "chats",
        element: <Chat />,
        children: [
          {
            path: ":id",
            element: <Chat />,
          },
        ],
      },
      {
        path: "events",
        element: <Events />,
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
  return (
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
    <RouterProvider router={router} />
    // </ErrorBoundary>
  );
};

export default Application;
