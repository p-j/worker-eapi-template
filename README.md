# `workers-eapi-template`
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fp-j%2Fworker-eapi-template.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fp-j%2Fworker-eapi-template?ref=badge_shield)


> [EAPI](https://github.com/p-j/eapi) for Edge API, or Extremelly Awesome Programation Interface, you decide

A template for kick starting a TypeScript Cloudflare worker project with all the bells and whistles.

- Inspired by [`worker-typescript-template`](https://github.com/cloudflare/worker-typescript-template) & [Express](https://expressjs.com/)
- Includes:
  - A Middleware setup to help with code reuse accross enpoints
  - A number of [type definitions](https://github.com/p-j/eapi/blob/main/packages/eapi-types/index.d.ts) to help you code with confidence
  - A number of compatible middlwares & utility that can be found at [`p-j/eapi`](https://github.com/p-j/eapi)
  - A test setup with Jest & all the polyfills & mock you need
  - [`tiny-request-router`](https://github.com/berstend/tiny-request-router) for routing your requests, you can replace it with any other router you like though, it's only baked in for convenience

## 🔋 Getting Started

This template is meant to be used with [Wrangler](https://github.com/cloudflare/wrangler). If you are not already familiar with the tool, I recommend that you install the tool and configure it to work with your [Cloudflare account](https://dash.cloudflare.com). Documentation can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler/).

To use this template, [click here](https://github.com/p-j/worker-eapi-template/generate) to create a github repository from it.

Alternatively you can use Wrangler to generate a new project:

```bash
# This currently doesn't work, waiting on https://github.com/cloudflare/wrangler/pull/1653 or an alternative fix
wrangler generate my-ts-project p-j/worker-eapi-template --branch=main
cd my-ts-project
yarn
```

### 👩 💻 Developing

[`src/index.js`](./src/index.ts) setup the fetchEventHandler with the appropriate router instance and default middlewares

[`src/router.js`](./src/router.ts) define the routes, the middlewares and handlers for your application

[`src/middlwares`](./src/middlwares) contains contains a demo middleware, you can find other 'ready to use' middlewares at [`p-j/eapi`](https://github.com/p-j/eapi)

[`src/handlers`](./src/handlers) contains a demo handler

[`__tests__/handlers.ts`](./__tests__/handlers.ts) contains a functional test for the demo

### 🧪 Testing

This template comes with jest tests which simply test that the request handler will perform as expected.

### ✏️ Formatting

This template uses [`prettier`](https://prettier.io/) to format the project. To invoke, run `yarn format`.

### 👀 Previewing and Publishing

For information on how to preview and publish your worker, please see the [Wrangler docs](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish).

## 🤢 Issues

If you run into issues with this specific project, please feel free to file an issue [here](https://github.com/p-j/worker-eapi-template/issues). If the problem is with Wrangler, please file an issue [here](https://github.com/cloudflare/wrangler/issues).

## ⚠️ Caveats

The `service-worker-mock` used by the tests is not a perfect representation of the Cloudflare Workers runtime. It is a general approximation. We recommend that you test end to end with `wrangler dev` in addition to a [staging environment](https://developers.cloudflare.com/workers/tooling/wrangler/configuration/environments/) to test things before deploying.

Also, the [`KV_MOCK`](https://github.com/p-j/worker-eapi-template/blob/main/jest.setup.ts#L6-L72) is currently fairly naive and could use a more thorough implementation.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fp-j%2Fworker-eapi-template.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fp-j%2Fworker-eapi-template?ref=badge_large)