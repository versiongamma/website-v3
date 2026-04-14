import { useLocation } from '@tanstack/react-router'

export const NotFound = () => {
  const { pathname } = useLocation()
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-6">
      <p className="font-mono mb-10 text-lg">
        {'>'} GET https://versiongamma.com{pathname} returned 404 Not Found
      </p>
      <p className="text-4xl">Uh oh! Looks like that page doesn't exist.</p>
      <a
        href="/"
        className="text-blue-400 text-2xl bg-slate-700/50 p-4 rounded-2xl transition-colors hover:text-blue-300 hover:bg-slate-800/50"
      >
        Back to Home?
      </a>
    </div>
  )
}
