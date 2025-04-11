import { AnyComponent } from "preact";
import { ErrorBoundary, lazy, LocationProvider, Route, Router } from "preact-iso";

import NotFound from "@pages/404";
import Landing from '@pages/landing';
import { SiteRoute } from "@utils/routes";
import "./app.css";

const Video = lazy(() => import("@pages/video"));
const Photos = lazy(() => import("@pages/photos"));
const Software = lazy(() => import('@pages/code'));
const Contact = lazy(() => import('@pages/mail'));

const routes: Record<SiteRoute, AnyComponent> = {
  [SiteRoute.LANDING]: Landing,
  [SiteRoute.VIDEO]: Video, 
  [SiteRoute.PHOTO]: Photos,
  [SiteRoute.SOFTWARE]: Software,
  [SiteRoute.CONTACT]: Contact,
}

const App = () => {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          {Object.entries(routes).map(([path, component]) => (
            <Route path={path} component={component} />
          ))}
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

export default App;
