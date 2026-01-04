import { AnyComponent } from "preact";
import {
  ErrorBoundary,
  lazy,
  LocationProvider,
  Route,
  Router,
} from "preact-iso";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import NotFound from "@pages/404";
import Landing from "@pages/landing";
import Teapot from "@pages/teapot";
import { SiteRoute } from "@utils/routes";
import "./app.css";

const Video = lazy(() => import("@pages/video"));
const Photos = lazy(() => import("@pages/photos"));
const Software = lazy(() => import("@pages/software"));
const Contact = lazy(() => import("@pages/contact"));

const queryClient = new QueryClient();

const routes: Record<SiteRoute, AnyComponent> = {
  [SiteRoute.LANDING]: Landing,
  [SiteRoute.VIDEO]: Video,
  [SiteRoute.PHOTO]: Photos,
  [SiteRoute.SOFTWARE]: Software,
  [SiteRoute.CONTACT]: Contact,
};

const App = () => {
  return (
    <LocationProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Router>
            {Object.entries(routes).map(([path, component]) => (
              <Route path={path} component={component} />
            ))}
            <Route path={"/coffee"} component={Teapot} />
            <Route default component={NotFound} />
          </Router>
        </ErrorBoundary>
      </QueryClientProvider>
    </LocationProvider>
  );
};

export default App;
