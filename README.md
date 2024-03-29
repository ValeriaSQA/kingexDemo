# demo-autotests-playwright

> E2E Demo by Kingex product

To set up the Playwright framework follow [Playwright DOCUMENTATION](https://playwright.dev/).

## Installation

Install dependencies

```bash
npm install
```

Install Playwright

```bash
npm init playwright@latest
```

## Running Tests

Run all e2e tests

```bash
npx playwright test
```

Tags are available to execute test suites

```bash
npx playwright test -grep @signIn
```

Run tests in headed browsers

```bash
npx playwright test --headed
```

Run all the tests against a specific project

```bash
npx playwright test --project=chromium
```

To record a trace during development mode

```bash
npx playwright test --trace on
```

To open the last HTML report run

```bash
npx playwright show-report
```

## Test Run Scripts

Scripts for running tests in Chrome, Firefox, and Safari browsers can be found within the `package.json` file

```
"test:signIn:chrome": "npx playwright test --project=chromium --grep @signIn",
"test:signIn:firefox": "npx playwright test --project=firefox --grep @signIn",
"test:signIn:webkit": "npx playwright test --project=webkit --grep @signIn"
```

## Test Results Example

```bash
Running 3 tests using 1 worker

  ✓  1 [chromium] › signIn.spec.ts:16:7 › Sign In E2E @signIn › Check that an unregistered user is unable to Sign In @signInError (7.8s)
  ✓  2 [firefox] › signIn.spec.ts:16:7 › Sign In E2E @signIn › Check that an unregistered user is unable to Sign In @signInError (6.6s)
  ✓  3 [webkit] › signIn.spec.ts:16:7 › Sign In E2E @signIn › Check that an unregistered user is unable to Sign In @signInError (8.1s)

  3 passed (26.2s)
```

## Test Architecture

### Configs

#### E2E

```bash
npx playwright test --config playwright.config.js
```

### Browsers

Projects are set up within the `playwright.config.js` file, enabling us to run tests on various browsers and devices

```js
  projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },

  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },

  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  }
]
```
