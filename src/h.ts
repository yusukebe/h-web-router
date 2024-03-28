import { METHODS } from './constants.js'
import { App, Handler } from './types.js'
import { PatternRouter } from 'hono/router/pattern-router'

const router = new PatternRouter()
const app = {
  fetch: (req, env?, ctx?) => {
    const url = new URL(req.url)
    const results = router.match(req.method, url.pathname)
    if (results[0][0]) {
      const params = results[0][0][1] as Record<string, string>
      return (results[0][0][0] as Handler)({ req, env, ctx, params })
    }
    return new Response('Not Found', { status: 404 })
  },
  on: (method, path, handler) => {
    router.add(method.toUpperCase(), path, handler)
    return app
  }
} as App

METHODS.forEach((m) => {
  app[m] = (...args) => app.on(m, ...args)
})

export { app }
