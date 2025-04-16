# interview-mmmintai

mmmint.ai codeing challenge. Run the application and solve the two coding challenges.

1. 📋 Dropfield + Image Gallery
2. 📋 Visualize a Damage Process

Please make sure to adhere to state of the art development principles.
Use the [Git Flow](https://www.gitkraken.com/learn/git/git-flow) branching strategy.

Next steps:

- [Fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
- Solve the challenges (between 1 - 4 hours)
- Cleanup the code for review
- Create a PR with the changes on your **own forked repo** (do not create a PR on our repo)
- Send the PR on your repo to us

## UI Framework

We are using [Vuetify](https://vuetifyjs.com/en/) the Open Source UI Library with beautifully handcrafted Vue Components. 
Here is a demo [Vuetify Vuejs 3 Admin Template](https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/landing/).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Setup

> ⚠️ **Minimum Node.js version required:** `v16.17.0`  
> Please make sure you're using Node.js `v16.17.0` or newer to avoid issues with ESM imports (e.g. `node:fs/promises`).  
> We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions.


```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
