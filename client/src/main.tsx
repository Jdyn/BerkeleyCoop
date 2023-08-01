import ReactDOM from "react-dom/client";
import Application from "./Application";
import { Provider } from "react-redux";
import { store } from "./api/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Application />
  </Provider>
);
