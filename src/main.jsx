import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import Context from "./Context";
import FallBack from "./component/FallBack";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<FallBack />}>
    <Context>
      <RouterProvider router={router} />
    </Context>
  </Suspense>
);
