# Testing Guide

## Purpose
This project contains Playwright end-to-end tests for the Demoblaze store using a Page Object + custom helpers approach.

Current test coverage:
- `@BLZ_001` Product list extraction and JSON output generation
- `@BLZ_002` Complete purchase flow (add to cart, cart validation, place order)

## Current Environment Setup

Environment setup and first-run installation are documented in [README.md](README.md).

## Running Tests

Use this section for test execution.

### Run all tests
```bash
npx playwright test
```

### Run a specific project/browser
```bash
npx playwright test --project=chromium
```

### Run by tag
```bash
npx playwright test -g @BLZ_001 --project=chromium
npx playwright test -g @BLZ_002 --project=chromium
```

### Open last HTML report
```bash
npx playwright show-report
```

## Base URL Behavior (Important)

At the moment, tests use hardcoded base URLs inside the spec files:
- `tests/GetDataFromProductList.spec.ts`
- `tests/CompletePurchaseFlow.spec.ts`

Current value used in tests:
- `https://www.demoblaze.com/`

`.env` is **not required** and is currently **not part of the active setup**.
If environment-based configuration is reintroduced later, document it here and in `playwright.config.ts`.

## Test Artifacts on Failure

Configured in `playwright.config.ts` under `use`:
- `screenshot: 'only-on-failure'`
- `video: 'retain-on-failure'`
- `trace: 'on-first-retry'`

What this means:
- Failed tests keep screenshots
- Failed tests keep first-attempt videos
- Trace is collected on retry, not on first attempt

Artifacts and reports are generated under:
- `test-results/`
- `playwright-report/`

## Project Testing Structure

- `tests/` test specs
- `fixtures/pageManager.ts` fixture wiring and dependency injection
- `page-objects/` page and modal abstractions
- `helpers/actions/` interaction wrappers (mouse, keyboard, browser)
- `helpers/assert/Assertions.ts` reusable assertions
- `helpers/productHelpers.ts` product list extraction helpers
- `output/` generated JSON files (e.g., product details)

## Test Design Notes

- Fixtures from `fixtures/pageManager.ts` inject shared dependencies (for example `actions`, `assert`, and page objects) to keep tests consistent.
- Interfaces (for example `interface/ProductInformation.ts`) are used to keep extracted or shared test data strongly typed.
- Assertions are centralized in `helpers/assert/Assertions.ts` to keep checks reusable.
- Interaction logic is delegated to actions/page objects to keep specs readable.
- Tests are tagged (for example `@BLZ_001`, `@BLZ_002`) for targeted execution.
- Stable page-object selectors are preferred over ad-hoc selectors in specs.
- `test.step(...)` is used to improve report readability and execution traceability.
- Step structure follows: *parent action step* → *nested assertion step(s)*.

## Scope Note

Some helper and assertion methods are intentionally broader than the current test cases.
This is deliberate to show how the framework can be extended for additional scenarios without changing the overall structure.
The implemented tests remain the source of truth for active coverage in this mock project.