import { ErrorBoundary, lazy, LocationProvider, Route, Router } from "preact-iso";
import "./app.css";

import Landing from '@pages/landing';
import NotFound from "@pages/404";

const Video = lazy(() => import("@pages/video"));
const Photos = lazy(() => import("@pages/photos"));
const Software = lazy(() => import('@pages/code'));
const Contact = lazy(() => import('@pages/mail'));

const App = () => {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Landing}/>
          <Route path="/video" component={Video} />
          <Route path="/photo" component={Photos} />
          <Route path="/software" component={Software} />
          <Route path="/contact" component={Contact} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

export default App;
