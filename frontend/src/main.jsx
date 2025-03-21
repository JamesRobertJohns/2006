
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import DynamicMap from "./DynamicMap.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import TutorialPage from "./pages/TutorialPage.jsx";
import HDBProvider from "./HDBProvider.jsx";  

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/map',
    element: <DynamicMap />,
  },
  {
    path: '/tutorial',
    element: <TutorialPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <HDBProvider>
    <RouterProvider router={router} />
  </HDBProvider>
);
