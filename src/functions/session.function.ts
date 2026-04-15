import {
  createClientOnlyFn,
  createIsomorphicFn,
  createServerFn,
} from '@tanstack/react-start'
import {
  getCookie,
  setCookie,
  deleteCookie,
} from '@tanstack/react-start/server'

const SESSION_KEY = 'hidePhotoModal'

const setHidePhotoModalServer = createServerFn().handler(() => {
  setCookie(SESSION_KEY, 'true')
})

const setHidePhotoModalClient = createClientOnlyFn(() => {
  sessionStorage.setItem(SESSION_KEY, 'true')
})

const clearHidePhotoModalServer = createServerFn().handler(() => {
  deleteCookie(SESSION_KEY)
})

const clearHidePhotoModalClient = createClientOnlyFn(() => {
  sessionStorage.removeItem(SESSION_KEY)
})

/** Clears the first visit flag for the current session.
 * Different from an isomorphic function, this runs on both client and server simultaneously,
 * instead of just running client/server code based on context. As such, can only be called from the client.
 */
export const setHidePhotoModal = createClientOnlyFn(() => {
  setHidePhotoModalClient()
  setHidePhotoModalServer()
})

/** Resets the first visit flag for the current session.
 * Different from an isomorphic function, this runs on both client and server simultaneously,
 * instead of just running client/server code based on context. As such, can only be called from the client.
 */
export const clearHidePhotoModal = createClientOnlyFn(() => {
  clearHidePhotoModalClient()
  clearHidePhotoModalServer()
})

export const isPhotoInfoModalDefaultHidden = createIsomorphicFn()
  .server(() => {
    return getCookie(SESSION_KEY) === 'true'
  })
  .client(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })
