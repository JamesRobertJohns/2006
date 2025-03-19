
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


/**
 * Sets up client-side routing for the application with route definitions
 * for the landing page, dynamic map, and tutorial page.
 */
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

/**
 * Wraps the application in HDBProvider to supply global context
 * for filtered HDB data across all routes.
 * 
 * @author Jia Yang
 */ReactDOM.createRoot(document.getElementById("root")).render(
  <HDBProvider>
    <RouterProvider router={router} />
  </HDBProvider>
);
