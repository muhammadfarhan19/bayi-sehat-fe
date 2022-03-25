<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Super Apps DIKTI - FE](#super-apps-dikti---fe)
  - [Start development](#start-development)
  - [Start with Mock](#start-with-mock)
    - [Update MOCK State](#update-mock-state)
  - [Deploy to staging](#deploy-to-staging)
  - [Staging Credential](#staging-credential)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Super Apps DIKTI - FE

## Start development

---

Prerequisites:
Make sure, to install `yarn` as the package manager (preferable).

Install all dependencies (run if there's a new dependency added in `package.json`)

```bash
yarn
```

And run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Start with Mock

---

Add `MOCK=1` to run the development server directed to the mock server. This will start the application with API host directed to http://localhost:3001 (MOCK Server)

```bash
MOCK=1 yarn dev
```

Start the mock server manually by running:

```bash
yarn mock-server:start
```

The mock server will be served in http://localhost:3001,

And use this command to stop the mock server:

```bash
yarn mock-server:stop
```

### Update MOCK State

- If you want to update the mock server state, use `mockoon` apps from this [link](https://mockoon.com) and load the mock state in `config/_mockServer.json`

## Deploy to staging

---

- Create Pull Request to branch `dev` after merging the PR. The workflow will be run and deploy the changes to `staging`.

## Staging Credential

```
196107061987101001,06071961
197707242009121001,24071977
196912152002121003,15121969
```
