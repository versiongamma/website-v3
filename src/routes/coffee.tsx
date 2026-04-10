import { createFileRoute } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import {
  getResponseHeaders,
  setResponseHeaders,
  setResponseStatus,
} from '@tanstack/react-start/server'

export const Route = createFileRoute('/coffee')({
  server: {
    middleware: [
      createMiddleware().server(async ({ next }) => {
        console.log('Running middleware')
        const headers = getResponseHeaders()
        headers.set('Test', 'This should be set if it works')
        setResponseHeaders(headers)
        setResponseStatus(418)
        return next()
      }),
    ],
    handlers: {
      GET: async ({}) => {
        return new Response(null)
      },
    },
  },
  // component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center font-mono text-lg">
      <p className="mb-6">
        {'>'} GET https://versiongamma.com/coffee returned{' '}
        <a
          href="https://www.rfc-editor.org/rfc/rfc2324#section-2.3.2"
          className="underline underline-offset-4"
          target="_blank"
        >
          418 I'm a Teapot
        </a>
      </p>
      <p className="">
        The server has refused to brew coffee because it is, in fact, a teapot.
      </p>
    </div>
  )
}
