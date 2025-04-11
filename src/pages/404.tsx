import { useLocation } from "preact-iso";

const NotFound = () => {
  const { path } = useLocation();
  return (
    <div className="flex flex-col w-full h-full items-center justify-center gap-6">
      <p className="font-mono mb-10 text-lg">
        {">"} GET https://versiongamma.com{path} returned 404
      </p>
      <p className="text-4xl">Uh oh! Looks like that page doesn't exist.</p>
      <a
        href="/"
        className="text-blue-500 text-2xl underline decoration-2 bg-slate-700/50 p-4 rounded-2xl"
      >
        Back to Home?
      </a>
    </div>
  );
};

export default NotFound;
