import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./api/store";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { UserProvider } from "./hooks/useUser";
import { SocketProvider } from "./hooks/socket/SocketContext";
import Cookies from "js-cookie";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <UserProvider>
      <SocketProvider
        url={`ws://localhost:4000/socket`}
        options={{ params: { token: JSON.parse(Cookies.get("user") ?? "{}")?.token ?? "" } }}
      >
        <RouterProvider router={router(store)} />
      </SocketProvider>
    </UserProvider>
  </Provider>
);
