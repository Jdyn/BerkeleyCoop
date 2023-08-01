import "./styles/global.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout/Root";
import Auth from "./screens/Auth/Auth";
import { useGetAccountQuery } from "./api/account/account";
import Chat from "./screens/Chat/Chat";
import Events from "./screens/Events/Events";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // loader: rootLoader,
    children: [
      {
        path: "chats",
        element: <Chat />,
				children: [
					{
						path: ":id",
						element: <Chat />,
					},
				]
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
	useGetAccountQuery();

  return (
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider router={router} />
    // </ErrorBoundary>
  );
};

export default Application;
