import {
  createClientOnlyFn,
  createIsomorphicFn,
  createServerFn,
} from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'

const SESSION_KEY = 'notFirstVisit'

export const isFirstVisit = createIsomorphicFn()
  .server(() => {
    return getCookie(SESSION_KEY) !== 'true'
  })
  .client(() => {
    return sessionStorage.getItem(SESSION_KEY) !== 'true'
  })

const clearFirstVisitServer = createServerFn().handler(() => {
  setCookie(SESSION_KEY, 'true')
})

const clearFirstVisitClient = createClientOnlyFn(() => {
  sessionStorage.setItem(SESSION_KEY, 'true')
})

/** Clears the first visit flag for the current session.
 * Different from an isomorphic function, this runs on both client and server simultaneously,
 * instead of just running client/server code based on context. As such, can only be called from the client.
 */
export const clearFirstVisit = createClientOnlyFn(() => {
  clearFirstVisitServer()
  clearFirstVisitClient()
})
