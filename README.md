# Lens Protocol Front End Starter - Template

### With Vite + ReactJs + TailwindCss3 + WAGMI

This is an template example of a basic build for a front-end application on top of [Lens Protocol](https://docs.lens.xyz/docs).

This template hosted with [fleek.co](https://fleek.co/) at [https://jolly-snow-9071.on.fleek.co/](https://jolly-snow-9071.on.fleek.co/)

1. [getProfiles](https://docs.lens.xyz/docs/get-profiles) - get profiles by passing in a user's handle in the url `/users/handle`

2. [explorePublications](https://docs.lens.xyz/docs/explore-publications) - returns a list of publications based on your request query

3. [createProfile](https://docs.lens.xyz/docs/create-profile) - Create a profile (only available on Mumbai testnet)

4. [createPost](https://docs.lens.xyz/docs/create-post-typed-data) - Create a post (text content only, yours to extend)

5. [follow](https://docs.lens.xyz/docs/functions#follow) - Follow a user

6. [burn](https://docs.lens.xyz/docs/functions#burn) - Unfollows a user

You can view all of the APIs [here](https://docs.lens.xyz/docs/introduction) and contract methods [here](https://docs.lens.xyz/docs/functions)

## Technologies

This project is built with the following open source libraries, frameworks and languages.
| Tech | Description |
| --------------------------------------------- | ------------------------------------------------------------------ |
| [ReactJS](https://reactjs.org/docs/getting-started.html) | JS Framework |
| [Vite](https://vitejs.dev/) | Frontend Tooling |
| [Typescript](https://www.typescriptlang.org/docs/) | Syntax for types |
| [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview) | Client Side Routing |
| [TailwindCss3](https://tailwindcss.com/) | CCS Framework |
| [WAGMI](https://wagmi.sh/) | A set of React Hooks for Web3 |
| [RainbowKit](https://www.rainbowkit.com/docs/introduction) | RainbowKit is a React library that makes it easy to add wallet connection to your dapp. |
| [@apollo/client](https://www.apollographql.com/docs/react/) | a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL |

---

## Configure

Create a .env file, by copying the .env-example file and include your alchemy and infura keys

Default set up for working with the Lens Protocol on Mumbai Testnet for dev and prod environments.
To switch prod environment to Polygon Mainnet, go into the `src/constants.ts` file and change

`export const IS_PRODUCTION = false;`

to

`export const IS_PRODUCTION = true;`

---

## Commands:

To start the dev server on your machine:

```shell
yarn dev
```

To start the dev server on your network:

```shell
yarn dev --host
```

To make the production build:

```shell
yarn build
```

To preview the production build locally:

```shell
yarn serve
```

---
