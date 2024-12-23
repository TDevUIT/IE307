# Web, Mobile Application Development

### Apps and Packages

- `native`: a [react-native](https://reactnative.dev/) app built with [expo](https://docs.expo.dev/)
- `web`: a [Next.js](https://nextjs.org/) app built with [react-native-web](https://necolas.github.io/react-native-web/)
- `nest`: a [Nest.js](https://nestjs.com/)
- `@repo/ui`: a stub [react-native](https://reactnative.dev/) component library shared by both `web` and `native` applications
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [Expo](https://docs.expo.dev/) for native development
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting


## Requirements

- [Expo](https://expo.dev/)
- [Turbo](https://turbo.build/repo/docs/getting-started/installation)
- [NestJS & NestCLI](https://docs.nestjs.com/first-steps)
- [NextJS](https://nextjs.org/)

---

## Running the Project

### Create Google OAuth App

Follow this guide: [Creating an OAuth App](https://support.google.com/cloud/answer/6158849?hl=en)

- **Authorized JavaScript origins**: `http://localhost:3001`
- **Authorized redirect URIs**: `http://localhost:3001/auth/google/callback`

Save the **Client ID** and **Client Secret** for the next step.

---

### Run the Project

```sh
$ yarn install
$ yarn run dev

```

#### Create a `.env` file in the `server` directory

```shell
$ cd server
$ cp .env.example .env
```

## Server

### Create migration

```shell
$ cd server
$ npx prisma migrate dev --name <name-migrate>
```
