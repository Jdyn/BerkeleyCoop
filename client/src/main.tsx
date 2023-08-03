import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./api/store";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router(store)} />
    </Provider>
  </StrictMode>
);
