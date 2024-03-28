# H - Ultra-small Web Router

H is an Ultra-small Web Router built with Hono's Pattern Router.

## Features

- Ultra Small - A "Hello World" application will be ~1KB (minified+gzipped).
- Perfected Router - Using [Hono](https://hono.dev)'s Pattern Router. It's flexible, supports many patterns, and is well-tested.
- Web Standards - Runs on Cloudflare Workers, Bun, Deno, and others.
- Optimized with Cloudflare Workers - Supports Bindings and Execution Context.

## Install

```txt
npm i h-web-router
// Or
yarn add h-web-router
```

## Example

```ts
import { app } from 'h-web-router'

// handle a GET request and return a TEXT response
app.get('/', () => new Response('Hi!'))

// capture path parameters and return a JSON response
app.post('/entry/:id', ({ params }) => {
  return Response.json({
    'your id is': params['id']
  })
})
// capture path parameters with RegExp
app.get('/posts/:date{\\d+}/:title{[a-z]+}', ({ params }) => {
  const { date, title } = params
  return Response.json({ post: { date, title } })
})

// get query parameters
app.get('/search', ({ req }) => {
  console.log(req.url)
  const query = new URL(req.url).searchParams.get('q')
  return new Response(`Your query is ${query}`)
})

// handle a PURGE method and return a Redirect response
app.on('PURGE', '/cache', () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/'
    }
  })
})

// get environment variables for Cloudflare Workers
app.get('/secret', ({ env }) => {
  console.log(env.TOKEN)
  return new Response('Welcome!')
})

// use an executionContext for Cloudflare Workers
app.get('/log', ({ ctx, req }) => {
  ctx.waitUntil((async () => console.log(`You access ${req.url.toString()}`))())
  return new Response('log will be shown')
})

// return a custom 404 response
app.get('*', () => {
  return new Response('Custom 404', {
    status: 404
  })
})

// export the app for Cloudflare Workers or Bun
export default app
```

## Author

Yusuke Wada

## License

MIT
