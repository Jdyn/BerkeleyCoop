import "./styles/global.css";
import { LoaderFunction, createBrowserRouter, redirect } from "react-router-dom";
import { AnyAction, Dispatch, Store } from "@reduxjs/toolkit";
import RootLayout from "./components/Layout/Root";
import Auth from "./screens/Auth/Auth";
import Chat from "./screens/Chat/Chat";
import Events from "./screens/Events/Events";
import { accountApi } from "./api";
import Event from "./screens/Events/Event/Event";
// import Cookies from "js-cookie";
import Home from "./screens/Home/Home";

const rootLoader: (dispatch: Dispatch) => LoaderFunction = (dispatch) => async (_request) => {
  const result = dispatch(accountApi.endpoints.getAccount.initiate() as unknown as AnyAction);
	// const user = JSON.parse(Cookies.get("user") ?? "{}");

  try {
    const response = await result.unwrap();
    if (response.ok) {
      return null;
    }
  } catch (error) {
    // dispatch(accountApi.endpoints.accountSignOut.initiate() as unknown as AnyAction);
    // Cookies.remove("user");
    return redirect("/signin");
  }

  // Cookies.remove("user");
  return redirect("/signin");
};

const router = (store: Store) =>
  createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      loader: rootLoader(store.dispatch),
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
          path: "events/:id",
          element: <Event />,
        },
        {
          path: "events",
          element: <Events />,
        },
				{
          path: "/",
          element: <Home />,
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

export default router;
