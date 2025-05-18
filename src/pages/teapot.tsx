const Teapot = () => (
  <div className="flex flex-col w-full h-full items-center justify-center font-mono text-lg">
    <p className="mb-6">
      {">"} GET https://versiongamma.com/coffee returned <a href="https://www.rfc-editor.org/rfc/rfc2324#section-2.3.2" className="underline underline-offset-4" target="_blank">418 I'm a Teapot</a>
    </p>
    <p className="">The server has refused to brew coffee because it is, in fact, a teapot.</p>
  </div>
);

export default Teapot;
