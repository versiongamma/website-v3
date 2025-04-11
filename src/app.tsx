import { ErrorBoundary, lazy, LocationProvider, Route, Router } from "preact-iso";
import "./app.css";

import Landing from '@pages/landing';
import NotFound from "@pages/404";

const Photos = lazy(() => import("@pages/photos"));

const App = () => {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Router>
          <Route path="/" component={Landing}/>
          <Route path="/photo" component={Photos} />
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

export default App;
