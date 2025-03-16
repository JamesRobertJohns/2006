import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import TutorialPage from "./pages/TutorialPage.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/map',
    element: <App />,
  },
  {
    path: '/tutorial',
    element: <TutorialPage />,
  },
]); 

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
