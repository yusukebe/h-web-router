import type { ExecutionContext } from 'hono'
import { METHODS } from './constants.js'

export type Handler = (c: {
  req: Request
  params: Record<string, string>
  env?: {}
  ctx?: ExecutionContext
}) => Response | Promise<Response>

export type App = {
  fetch: (req: Request, env?: {}, ctx?: ExecutionContext) => Response | Promise<Response>
  on: (method: string, path: string, handler: Handler) => App
} & {
  [M in (typeof METHODS)[number]]: (path: string, handler: Handler) => App
}
